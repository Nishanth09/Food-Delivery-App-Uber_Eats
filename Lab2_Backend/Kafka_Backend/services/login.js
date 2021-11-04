const User = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function handle_request (msg, callback) {
    let results = {}
    User.findOne({ username: msg.username }, async (error, user) => {
        if (error) {
            callback(null, "500")
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
            results["_id"] = user._id,
            results["JWT"] = token
            results["username"] = user.username,
            results["email"] = user.email,
            results["account_type"] = user.account_type
            callback(null, results)
        }
        else {
            callback(null, "401")
        }
    })
}

module.exports.handle_request = handle_request
