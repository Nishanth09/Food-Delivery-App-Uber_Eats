const kafka = require('../kafka/client')

const getSelectedRestaurant = async (req, res) => {
    console.log("inside selected")
    kafka.make_request('get-selected-restaurant', req.query, function (err, results) {
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
          console.log(results)
          res.status(200).send(results)
        }
    })
}

module.exports = getSelectedRestaurant
