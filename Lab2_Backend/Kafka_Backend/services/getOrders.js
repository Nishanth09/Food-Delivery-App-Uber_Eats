const Order = require('../models/OrderModel')

async function handle_request (msg, callback) {
    try {
        const { userId } = msg
        const orderResult = await Order.find({
            userid : userId
        })
        if (orderResult) {
            callback(null, orderResult)
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
