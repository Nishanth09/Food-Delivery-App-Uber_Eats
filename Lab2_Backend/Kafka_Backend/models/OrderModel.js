const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    resimg: {
        type: String
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    restid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Restaurant'
    },
    order_status: {
        type: String, 
        required: true
    },
    order_items: [
        {
            qty: {
                type: Number
            },
            dishName: {
                type: String
            },
            price: {
                type: String
            },
            category: {
                type: String
            },
            dishimage: {
                type: String
            },
            description: {
                type: String
            },
            instructions: {
                type: String
            },
            ingredients: {
                type: String
            }
        }
    ],
    price: {
        type: String,
        required: true
    },
    delivery_address: {
        type: String
    }
}, {timestamp: true})


const Order = mongoose.model('Order', orderSchema)
module.exports = Order
