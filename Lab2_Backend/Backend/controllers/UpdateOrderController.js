const kafka = require('../kafka/client')

const updateOrder = (req, res) => {
    let message = req.body
    message.userId = req.session.userId
    kafka.make_request('update-order', message, function (err, results) {
        if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again."
            })
          } else if (results == "500") {
            res.status(500).send("Database error")
          } else if (results === "404") {
            res.status(404).send("Resource not found")
          } else {
            console.log(results)
            res.status(200).send("order updated successfully")
          }
    })
}

module.exports = updateOrder
