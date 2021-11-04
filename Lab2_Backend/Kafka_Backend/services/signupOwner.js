const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

async function handle_request (msg, callback) {
    let result = {}
    const data = {
        username : msg.username,
        mobile : msg.mobile,
        email : msg.email
    }
    console.log(data)
    const { username, password, mobile, email, dob } = msg
    const userExists = await User.findOne({ username })
    if (userExists) {
        return callback(null, "409")
    } else {
        const salt = await bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password, salt)
        const user = await User.create({
        username,
        mobile,
        email,
        password: Hashedpassword,
        dob,
        account_type: "O"
        });
 
        if (user) {
        console.log("Created!")
        callback(null, "User created")
        } else {
            callback(null, "500")
        }
    }
};

module.exports.handle_request = handle_request
