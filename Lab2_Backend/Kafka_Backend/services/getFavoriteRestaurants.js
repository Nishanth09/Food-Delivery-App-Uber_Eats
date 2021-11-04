const Restaurant = require('../models/RestaurantModel')
const User = require('../models/UserModel')

async function handle_request (msg, callback) {
    const { userId } = msg
    try {
        const userDetails = await User.findOne({_id : userId}).populate('fav_restaurant')
        console.log("user res:", userDetails)
        if (userDetails) {
            callback(null, userDetails)
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
