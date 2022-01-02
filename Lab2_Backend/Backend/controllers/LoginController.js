const User = require('../models/UserModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async (req, res) => {
  let results = {}
  const msg = req.body
  console.log(msg)
  User.findOne({ username: msg.username }, async (error, user) => {
      if (error) {
        res.status(500).send("Database error")
      }
      let isValid = false
      try {
          isValid = await bcrypt.compare(msg.password, user.password)
      } catch(error) {
          console.log(error)
      } 
      if (isValid) {
          const payload = { _id: user._id, username: user.username};
          const token = jwt.sign(payload, process.env.secret, {
              expiresIn: 1008000
          });
          console.log(user)
          results["_id"] = user._id,
          results["JWT"] = token
          results["username"] = user.username,
          results["email"] = user.email,
          results["account_type"] = user.account_type
          req.session.userId = user._id
          res.status(200).send(results)
      }
      else {
        res.status(401).send("Unauthorized")
      }
  })
}

module.exports = loginUser
