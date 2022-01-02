const User = require('../models/UserModel')

const updateUser = async (req, res) => {
    let msg = req.body 
    msg.userId = req.session.userId
    try {
      console.log(msg)
      const {userId} = msg
      const update = msg
      const user = await User.findOneAndUpdate({_id: userId}, update, {new: true})
      if (user) {
        res.status(200).send(user)
      } else {
        res.status(404).send("Resource not found")
      }  
  } catch (err) {
    res.status(500).send("Database error")
  }
}

module.exports = updateUser
