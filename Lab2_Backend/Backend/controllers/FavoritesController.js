const kafka = require('../kafka/client')

const favoriteRestaurants = (req, res) => {
    console.log("inside fav")
    let message = req.body
    message.userId = req.session.userId
    kafka.make_request('favorites', message, function (err, results) {
        if (err) {
            res.json({
              status: "error",
              msg: "System Error, Try Again."
            })
          } else if (results == "500") {
            res.status(500).send("Database error")
          } else {
            console.log(';;;;;;',req.session)
            res.status(200).send("added to favorites successfully")
          }
    })
}

module.exports = favoriteRestaurants
