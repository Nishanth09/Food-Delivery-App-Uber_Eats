const kafka = require('../kafka/client')

const postOrder = (req, res) => {
    console.log('post order')
    let message = req.body
    message.userId = req.session.userId
    kafka.make_request('post-order', message, function (err, results) {
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
            res.status(200).send("order posted successfully")
          }
    }) 
}

module.exports = postOrder
