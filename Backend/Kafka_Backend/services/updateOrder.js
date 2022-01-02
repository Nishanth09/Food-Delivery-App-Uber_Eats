const Order = require('../models/OrderModel')

async function handle_request (msg, callback) {
    
        console.log("message : ", msg)
        const {userId} = msg
        const orderDetails = await Order.findOneAndUpdate({_id: msg.orderid}, {"order_status": msg.order_status}, {new: true})
        if (orderDetails) {
            callback(null, "200")
        } else {
            callback(null, "404")
        }
    
}

module.exports.handle_request = handle_request
