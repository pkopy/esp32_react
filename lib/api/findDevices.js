/*
 *
 * Add scale API
 * 
 */

// Dependecies
const helpers = require('../helpers');
const udpClient = require('../udpClient')


const findDevices = {}

findDevices.init = (req, res) => {
    const method = req.method.toLowerCase();
    const acceptableMethods = ['get'];
    if (acceptableMethods.indexOf(method) > -1) {
        findDevices[method](req, res);
    } else {
        helpers.response(res, 405);
    }
};

findDevices.get = (req, res) => {
    const devices = [] 
    udpClient.findUdpDevices('start')
        .then(data => {
            
            console.log(data)
            // data = JSON.stringify(data)
            helpers.response(res, 200, data)
        })
        .catch(data => console.log(data))
}

module.exports = findDevices;