const Order = require('../models/OrderModel')

const postOrder = async (req, res) => {
    console.log('post order')
    let msg = req.body
    msg.userId = req.session.userId
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
          res.status(200).send(order)
      } else {
        res.status(404).send("Resource not found")
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = postOrder
