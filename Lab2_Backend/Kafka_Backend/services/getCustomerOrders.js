const Order = require('../models/OrderModel')
const Restaurant = require('../models/RestaurantModel')

async function handle_request (msg, callback) {
    const { userId } = msg
    try {
        const restaurantDetails = await Restaurant.findOne({ownerid : userId})
        if (restaurantDetails) {
            const orderDetails = await Order.find({restid: restaurantDetails._id}).populate('userid')
            if (orderDetails) {
                callback(null, orderDetails)
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
