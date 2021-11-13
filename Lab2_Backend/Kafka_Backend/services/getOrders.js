const Order = require('../models/OrderModel')

async function handle_request (msg, callback) {
    const { userId } = msg
    const page = parseInt(msg.page)
    const limit = parseInt(msg.limit)

    const startIndex = (page - 1) * limit
    const endIndex = page * limit

    const results = {}

    if (endIndex < await Order.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    try {
      results.results = await Order.find({userid : userId}).limit(limit).skip(startIndex).exec()
      if (results.results) {
        callback(null, results.results)   
      } else {
          callback(null, "404")
      }
      
    } catch (e) {
      callback(null, "500")
    }
}

module.exports.handle_request = handle_request
