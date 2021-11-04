const kafka = require('../kafka/client')

const loginUser = (req, res) => {
      kafka.make_request('login', req.body, function (err, results) {
        if (err) {
          res.json({
            status: "error",
            msg: "System Error, Try Again."
          })
        } else if (results === "401") {
          res.status(401).send("Unauthorized")
        } else if (results == "500") {
          res.status(500).send("Database error")
        } else {
          req.session.userId = results['_id']
          res.status(200).send(results)
        }
    })
}

module.exports = loginUser
