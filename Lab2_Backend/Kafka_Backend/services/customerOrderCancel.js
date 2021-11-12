const Order = require('../models/OrderModel')

async function handle_request (msg, callback) {
    try {
        console.log("message : ", msg)
        const orderDetails = await Order.findOneAndUpdate({_id: msg.orderid}, {"order_status": msg.order_status}, {new: true})
        if (orderDetails) {
            callback(null, "200")
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
