const User = require('../models/UserModel')

const userDetails = async (req, res) => {
    let msg = {}
    console.log(req.session)
    msg.userId = req.session.userId
    try { 
      console.log("msg : ", msg)
      if (msg) {
          const userDetails = await User.findOne({
              _id : msg.userId
          })
          if (userDetails) {
            res.status(200).send(userDetails)
          } else {
            res.status(404).send("resource not found")
          }
      }
  } catch(err) {
    res.status(500).send("Database error")
  }
}

module.exports = userDetails