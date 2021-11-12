const mongoose = require('mongoose')

const restaurantSchema = mongoose.Schema({
    resimg: {
        type: String
    },
    ownerid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    items: [
        {
            dishName: {
                type: String,
                required: true
            },
            description: {
                type: String
            },
            ingredients: {
                type: String
            },
            price: {
                type: String,
                required: true
            },
            category: {
                type: String
            },
        }
    ],
    description: {
        type: String
    },
    mode: {
        type: String,
        required: true
    },
    dietary: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    open_timings: {
        type: String,
        required: true
    },
    close_timings: {
        type: String,
        required: true
    }
}, {timestamp: true})


const Restaurant = mongoose.model('Restaurant', restaurantSchema)
module.exports = Restaurant
