const Order = require('../models/OrderModel')
const Restaurant = require('../models/RestaurantModel')

const getCustomerOrders = async (req, res) => {
    let msg = {}
    msg.userId = req.session.userId
    const { userId } = msg
    try {
        const restaurantDetails = await Restaurant.findOne({ownerid : userId})
        if (restaurantDetails) {
            const orderDetails = await Order.find({restid: restaurantDetails._id}).populate('userid')
            if (orderDetails) {
              res.status(200).send(orderDetails)
            } else {
              res.status(404).send("resource not found")
            }
        } else {
          res.status(404).send("resource not found")
        }
    } catch(err) {
      res.status(500).send("Database error")
    }
} 

module.exports = getCustomerOrders
