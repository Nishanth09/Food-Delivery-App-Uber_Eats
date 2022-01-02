const Restaurant = require('../models/RestaurantModel')

const getSelectedRestaurant = async (req, res) => {
  const msg = req.query
  try {
    console.log("msg : ", msg)
    if (msg) {
        const restaurantResult = await Restaurant.find({
            _id : msg.restid
        })
        if (restaurantResult) {
          res.status(200).send(restaurantResult)
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

module.exports = getSelectedRestaurant
