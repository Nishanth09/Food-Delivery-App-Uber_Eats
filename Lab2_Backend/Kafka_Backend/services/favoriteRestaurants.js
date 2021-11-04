const Restaurant = require('../models/RestaurantModel')
const User = require('../models/UserModel')

async function handle_request (msg, callback) {
    try {
        console.log("message : ", msg)
        const {userId} = msg
        const update = msg
        console.log("update : ", update)
        const restaurant = await Restaurant.findOne({name: update.fav_restaurant})
        console.log(restaurant)
        if (restaurant) {
            const user = await User.findOneAndUpdate({_id: userId}, {$push : {"fav_restaurant": restaurant._id}}, {new: true})
            if (user) {
                callback(null, "200")
            } else {
                callback(null, "500")
            }
        } else {
            console.log("no data found")
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
