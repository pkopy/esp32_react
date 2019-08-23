const helpers = require('../helpers');
const db = require('../db')
const uuid = require('uuid/v4');
const order = {}

order.init = (req, res) => {
    const method = req.method.toLowerCase();
    const acceptableMethods = ['post','get'];
    if (acceptableMethods.indexOf(method) > -1) {
        order[method](req, res);
    } else {
        helpers.response(res, 405);
    }
}

order.post = (req, res) => {
    req.on('data', (data) => {
        let payload = Buffer.from(data).toString();
        let payloadObj = JSON.parse(payload)

        if (payloadObj.name && 
            payloadObj.base &&
            payloadObj.operator &&
            payloadObj.max &&
            payloadObj.min &&
            payloadObj.treshold &&
            payloadObj.quantity &&
            payloadObj.scale &&
            payloadObj.scaleName
            ) {
            payloadObj.guid = uuid()
            db.create('orders', payloadObj)
                .then(() => helpers.response(res, 200, payloadObj.guid))
                .catch((err) => helpers.response(res, 400, err))
        } else {
           helpers.response(res, 400, {"error":"missing fields"})
        }
    })
}

order.get = (req, res) => {
    db.read('orders')
    .then(orders => helpers.response(res, 200, orders))
    .catch(err => console.log(err))
}

module.exports = order