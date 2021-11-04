const kafka = require('../kafka/client')

const getCustomerOrders = async (req, res) => {
    let message = {}
    message.userId = req.session.userId
    kafka.make_request('get-customer-orders', message, function (err, results) {
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
          res.status(200).send(results)
        }
    })
} 

module.exports = getCustomerOrders
