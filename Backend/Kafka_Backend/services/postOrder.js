const Order = require('../models/OrderModel')

async function handle_request (msg, callback) {
    try {
        console.log("message : ", msg)
        const {userId, restid, order_status, order_items, price, delivery_address} = msg
        const order = await Order.create({
            userid: userId,
            restid,
            order_status, 
            order_items, 
            price, 
            delivery_address
        })
        if (order) {
            console.log("order posted successfully")
            callback(null, "200")
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
