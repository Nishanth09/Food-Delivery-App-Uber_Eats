const kafka = require('../kafka/client')

const customerOrderCancel = (req, res) => {
    let message = req.body
    kafka.make_request('customer-order-cancel', message, function (err, results) {
        if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again."
            })
          } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results == "404") {
            res.status(500).send("Resource not found")
          } else {
            res.status(200).send("cancelled order successfully")
          }
    })
}

module.exports = customerOrderCancel
