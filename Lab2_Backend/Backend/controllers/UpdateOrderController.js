const Order = require('../models/OrderModel')

const updateOrder = async (req, res) => {
    let msg = req.body
    msg.userId = req.session.userId
    console.log("message : ", msg)
        const {userId} = msg
        const orderDetails = await Order.findOneAndUpdate({_id: msg.orderid}, {"order_status": msg.order_status}, {new: true})
        if (orderDetails) {
          res.status(200).send(orderDetails)
        } else {
          res.status(404).send("Resource not found")
        }
}

module.exports = updateOrder
