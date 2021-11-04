const mongoose = require('mongoose') 
const bcrypt = require('bcryptjs')
 
const userSchema = mongoose.Schema({
        userimage: {
            type: String
        },
        username:{
            type: String,
            required:true
            
        },
        password:{
            type: String,
            required:true
            
        },
        nickname:{
            type: String
        },
        mobile:{
            type: String,
            required: true,
            unique: true
        },
        email:{
            type: String,
            required: true
        },
        street:{
            type: String
        },
        city:{
            type: String
        },
        country:{
            type: String
        },
        state:{
            type:String
        },
        zip:{
            type:String
        },
        fav_restaurant:[{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Restaurant'
        }],
        account_type:{
            type: String,
            required:true
        },
        address:{
            type: String,
        },
        dob:{
            type: Date,
            required:true
        }
    },{timestamps:true})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('User',userSchema) 
module.exports = User
