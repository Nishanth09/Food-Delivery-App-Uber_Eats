const Restaurant = require('../models/RestaurantModel')

const updateRestaurant = async (req, res) => {
    let msg = req.body
    msg.userId = req.session.userId
    try {
      console.log("message : ", msg)
      const {userId} = msg
      const update = msg
      console.log("update : ", update)
      const restaurant = await Restaurant.findOneAndUpdate({ownerid: userId}, update, {new: true})
      if (restaurant) {
        res.status(200).send(restaurant)
      } else {
        res.status(404).send("Resource not found")
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = updateRestaurant
