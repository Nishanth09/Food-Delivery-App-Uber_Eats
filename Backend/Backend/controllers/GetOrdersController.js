const Order = require('../models/OrderModel')

const getOrders = async (req, res) => {
  console.log("req query", req.query)
    let msg = {}
    msg.userId = req.session.userId
    msg.page = req.query.page
    msg.limit = req.query.limit

    const { userId } = msg
    const page = parseInt(msg.page)
    const limit = parseInt(msg.limit)

    const startIndex = (page - 1) * limit 
    const endIndex = page * limit

    const results = {}
    if (page === 0 && limit === 0) { 
      try {
        results.results = await Order.find({userid : userId})
        if (results.results) {
          res.status(200).send(results.results) 
        } else {
          res.status(404).send("resource not found")
        } 
      } catch (error) {
        res.status(500).send("Database error")
      }
    } else {
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
          res.status(200).send(results.results)  
        } else {
          res.status(404).send("resource not found")
        }
        
      } catch (e) {
        res.status(500).send("Database error")
      }
    }
} 

module.exports = getOrders
