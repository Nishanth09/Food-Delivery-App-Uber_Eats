const kafka = require('../kafka/client')

const createUser = async (req, res) => {
  console.log("creating user")
  kafka.make_request('signup-user', req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else if (results === "409") {
      res.status(409).send("User already exits")
    } else if (results == "500") {
      res.status(500).send("Database error")
    } else if (results == "404") {
      res.status(404).send("Resource not found")
    } else {
      res.status(200).send("User created")
    }
});
}

const createOwner = async (req, res) => {
  console.log("creating owner")
  kafka.make_request('signup-owner', req.body, function (err, results) {
    if (err) {
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      })
    } else if (results === "409") {
      res.status(409).send("Owner already exits")
    } else if (results == "500") {
      res.status(500).send("Database error")
    } else if (results == "404") {
      res.status(404).send("Resource not found")
    } else {
      res.status(200).send("Owner created")
    }
});
}


module.exports = {createUser, createOwner }
