const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

async function handle_request (msg, callback) {
    try {
        const { username, password, email } = msg
        const userExists = await User.findOne({ username })
        if (userExists) {
            return callback(null, "409")
        } else {
            const salt = await bcrypt.genSalt(10);
            const Hashedpassword = await bcrypt.hash(password, salt)
            const user = await User.create({
            username,
            email,
            password: Hashedpassword,
            dob: "1999-09-09",
            account_type: "O"
            });
     
            if (user) {
            console.log("Created!")
            callback(null, "User created")
            } else {
                callback(null, "404")
            }
        }   
    } catch (error) {
        callback(null, "500")
    }
};

module.exports.handle_request = handle_request
