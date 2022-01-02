const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
    try {
        console.log("msg : ", msg)
        if (msg) {
            const restaurantResult = await Restaurant.find({
                _id : msg.restid
            })
            if (restaurantResult) {
                callback(null, restaurantResult)
            } else {
                callback(null, "404")
            }
    } else {
        callback(null, "404")
    }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
