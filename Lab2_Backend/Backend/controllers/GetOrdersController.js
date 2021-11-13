const kafka = require('../kafka/client')

const getOrders = async (req, res) => {
  console.log("req query", req.query)
    let message = {}
    message.userId = req.session.userId
    message.page = req.query.page
    message.limit = req.query.limit
    kafka.make_request('get-orders', message, function (err, results) {
      if (err) {
        res.json({
          status: "error",
          msg: "System Error, Try Again."
        })
      } else if (results == "500") {
        res.status(500).send("Database error")
      } else if (results == "404"){
        res.status(404).send("Resource not found")
      } else {
        console.log("results", results)
        res.status(200).send(results)
      }
    })
} 

module.exports = getOrders
