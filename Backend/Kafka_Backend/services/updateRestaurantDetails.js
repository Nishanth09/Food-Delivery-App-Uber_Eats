const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
    try {
        console.log("message : ", msg)
        const {userId} = msg
        const update = msg
        console.log("update : ", update)
        const restaurant = await Restaurant.findOneAndUpdate({ownerid: userId}, update, {new: true})
        if (restaurant) {
            callback(null, "200")
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
