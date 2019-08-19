const helpers = require('../helpers');
const dataFS = require('../dataFS')

const dotenv = require('dotenv');
dotenv.config();

const addDevice = {}

addDevice.init = (req, res) => {
    const method = req.method.toLowerCase();
    const acceptableMethods = ['post','get'];
    if (acceptableMethods.indexOf(method) > -1) {
        addDevice[method](req, res);
    } else {
        helpers.response(res, 405);
    }
};

addDevice.get = (req, res) => {
    console.log(req.query)
    dataFS.create('esp32','esp32',req.query, (data) => console.log(data))
    helpers.response(res, 200);
}

module.exports = addDevice