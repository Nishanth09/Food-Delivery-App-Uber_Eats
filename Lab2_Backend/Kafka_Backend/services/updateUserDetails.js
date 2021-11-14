const User = require('../models/UserModel')

async function handle_request (msg, callback) {
    try {
        console.log(msg)
        const {userId} = msg
        const update = msg
        const user = await User.findOneAndUpdate({_id: userId}, update, {new: true})
        if (user) {
            callback(null, "200")
        } else {
            callback(null, "404")
        }  
    } catch (err) {
        callback(null, "500")
    }
}

module.exports.handle_request = handle_request
