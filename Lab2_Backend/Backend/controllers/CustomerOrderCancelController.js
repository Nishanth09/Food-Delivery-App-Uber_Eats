const Order = require('../models/OrderModel')

const customerOrderCancel = async (req, res) => {
    let msg = req.body
    try {
      console.log("message : ", msg)
      const orderDetails = await Order.findOneAndUpdate({_id: msg.orderid}, {"order_status": msg.order_status}, {new: true})
      if (orderDetails) {
          res.status(200).send(orderDetails)
      } else {
          res.status(404).send("resource not found")
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = customerOrderCancel
