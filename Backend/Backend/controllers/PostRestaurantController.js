const Restaurant = require('../models/RestaurantModel')

const postRestaurant = async (req, res) => {
    let msg = req.body
    msg.userId = req.session.userId
    try {
      console.log("message : ", msg)
      const {userId, name, items, mode, dietary, address, location, open_timings, close_timings} = msg
      const restaurant = await Restaurant.create({
          ownerid: userId,
          name, 
          items, 
          mode, 
          dietary, 
          address, 
          location, 
          open_timings, 
          close_timings
      })
      if (restaurant) {
          console.log("restaurant created")
          res.status(200).send(restaurant)
      } else {
        res.status(404).send("Resource not found")
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = postRestaurant
