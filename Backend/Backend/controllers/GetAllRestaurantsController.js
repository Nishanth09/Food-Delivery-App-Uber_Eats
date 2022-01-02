const Restaurant = require('../models/RestaurantModel')

const getAllRestaurant = async (req, res) => {
  const msg = req.query
  console.log("all res : ", msg)
    try {
        if (msg.location) {
            const restaurantResult = await Restaurant.find({
                location : msg.location
            })
            if (restaurantResult) {
              res.status(200).send(restaurantResult)
            } else {
              res.status(404).send("resource not found")
            }
        } else {
            const restaurantResult = await Restaurant.find({})
            if (restaurantResult) {
              res.status(200).send(restaurantResult)
            } else {
              res.status(404).send("resource not found")
            }
        }
    } catch(err) {
      res.status(500).send("Database error")
    }
} 

module.exports = getAllRestaurant
