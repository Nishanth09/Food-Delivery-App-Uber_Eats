const User = require('../models/UserModel')

async function handle_request (msg, callback) {
    try {
        console.log("msg : ", msg)
        if (msg) {
            const userDetails = await User.findOne({
                _id : msg.userId
            })
            if (userDetails) {
                callback(null, userDetails)
            } else {
                callback(null, "404")
            }
        }
    } catch(err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
