/*
 *
 * Library for collecting and editing data from database
 * 
 */


// Dependencies
const mysql = require('mysql');
const { HOST, USER, PASSWORD, DATABASE } = require('./config');
const configDB = {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
}
console.log(configDB)
const lib = {};

// Create new record
// data as json
lib.create = (table, data) => {
    return new Promise((res, rej) => {
        const con = mysql.createConnection(configDB);
        con.query(`INSERT INTO ${table} SET ?`, data, (err, result, fields) => {
            if (!err && result) {
                res(result)
            } else {
                console.log(err)
                rej({ 'Error': 'Could not create a new record' });
            }
        });
        con.end();
    });
};

//Read from DB
lib.read = (table, field, value, time1, time2) => {
    return new Promise((res, rej) => {
        const con = mysql.createConnection(configDB);
        // range of time
        if (field && value && time1) {
            let time = time2 ? `'${time2}'` : 'now()';
            const coumn = 'time'
            // console.log(time)
            if (value === '_') {
                con.query(`Select * from ${table} WHERE time BETWEEN CAST('${time1}' AS DATE) AND CAST(${time} AS DATE)`, (err, result, fields) => {
                    if (!err && result && result.length > 0) {
                        console.log(time2)
                        res(result);
                    } else {
                        console.log('cccc')
                        rej(JSON.stringify({ 'Error': 'Could not find the specified record' }));
                    }
                });
            } else {
                con.query(`Select * from ${table} WHERE ${field} = ? AND time BETWEEN CAST('${time1}' AS DATE) AND CAST(${time} AS DATE)`, [value], (err, result, fields) => {
                    if (!err && result && result.length > 0) {
                        console.log(time2)
                        res(result);
                    } else {
                        console.log('cccc')
                        rej(JSON.stringify({ 'Error': 'Could not find the specified record' }));
                    }
                });

            }
        } else if (field && value) {
            con.query(`Select * from ${table} WHERE ${field} = ?` , [value], (err, result, fields) => {
                if (!err && result && result.length > 0) {
                    res(result);
                } else {
                    rej(JSON.stringify({ 'Error': 'Could not find the specified record' }));
                }
            });
        } else {
            // read all data from table
            con.query(`Select * from ${table}`, (err, result, fields) => {
                if (!err && result && result.length > 0) {
                    res(result);
                } else {
                    rej(JSON.stringify({ 'Error': 'Could not find the specified records' }));
                }
            });
        }
        con.end();
    });
};

lib.update = (table, fieldToChange, fieldToChangeValue, field, value) => {
    return new Promise((res, rej) => {
        const con = mysql.createConnection(configDB);
        if (!field && !value) {
            con.query(`Update ${table} SET ${fieldToChange}  = ?`, [fieldToChangeValue], (err, result, fields) => {
                if (!err && result) {
                    res(result)
                } else {
                    rej(JSON.stringify({ 'Error': 'Could not update the specified record' }));
                }
            });
        } else {
            con.query(`Update ${table} SET ${fieldToChange} = ? WHERE ${field} = ?`, [fieldToChangeValue, value], (err, result, fields) => {
                if (!err && result) {
                    res(result)
                } else {
                    rej({ 'Error': 'Could not update the specified record' });
                }
            });

        }

        con.end();
    });
    
};

//Delete from DB
lib.delete = (table, field, value) => {
    return new Promise((res, rej) => {
        const con = mysql.createConnection(configDB);
        con.query(`Delete from ${table} WHERE ${field} = ?`, [value], (err, result, fields) => {
            if (!err && result) {
                res(result);
            } else {
                rej({ 'Error': 'Could not delete the specified record' });
            }
        });

        con.end();
    });
};

module.exports = lib;