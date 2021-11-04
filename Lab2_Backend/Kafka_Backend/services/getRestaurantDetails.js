const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
    try {
        const { userId } = msg
        const restaurantResult = await Restaurant.find({
            ownerid : userId
        })
        if (restaurantResult) {
            callback(null, restaurantResult)
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
