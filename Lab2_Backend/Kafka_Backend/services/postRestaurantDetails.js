const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
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
            callback(null, "200")
        } else {
            callback(null, "404")
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
