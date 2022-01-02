const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  console.log("creating user")
  try {
    const { username, password, email, dob } = req.body
    const userExists = await User.findOne({ username })
    if (userExists) {
        return res.status(409).send("User exists")
    } else {
        const salt = await bcrypt.genSalt(10);
        const Hashedpassword = await bcrypt.hash(password, salt)
        const user = await User.create({
        username,
        email,
        password: Hashedpassword,
        dob,
        account_type: "C"
        });

        if (user) {
        console.log("Created!")
        res.status(200).send("User created")
        } else {
          res.status(404).send("Resource not found")
        }
    }
} catch (error) {
  res.status(500).send("Database error")
}
}

const createOwner = async (req, res) => {
  console.log("creating owner")
  try {
    const { username, password, email } = req.body
    const userExists = await User.findOne({ username })
    if (userExists) {
      return res.status(409).send("User exists")
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
        res.status(200).send("User created")
        } else {
          res.status(404).send("Resource not found")
        }
    }   
} catch (error) {
  res.status(500).send("Database error")
}
}


module.exports = {createUser, createOwner }
