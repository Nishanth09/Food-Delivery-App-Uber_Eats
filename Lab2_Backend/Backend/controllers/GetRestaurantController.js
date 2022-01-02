const Restaurant = require('../models/RestaurantModel')

const getRestaurant = async (req, res) => {
    let msg = {}
    msg.userId = req.session.userId
    try {
      const { userId } = msg
      const restaurantResult = await Restaurant.findOne({
          ownerid : userId
      })
      if (restaurantResult) {
        res.status(200).send(restaurantResult)
      } else {
        res.status(404).send("resource not found")
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = getRestaurant
 