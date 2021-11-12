const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
    console.log("all res : ", msg)
    try {
        if (msg.location) {
            const restaurantResult = await Restaurant.find({
                location : msg.location
            })
            if (restaurantResult) {
                callback(null, restaurantResult)
            } else {
                callback(null, "404")
            }
        } else {
            console.log("here---")
            const restaurantResult = await Restaurant.find({})
            if (restaurantResult) {
                callback(null, restaurantResult)
            } else {
                callback(null, "404")
            }
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
