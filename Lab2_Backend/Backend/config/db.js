const mongoose =  require('mongoose')
require('dotenv').config()
const connectDB = async () =>{
    try {
            const con = await mongoose.connect('',
            {useUnifiedTopology:true,useNewUrlParser:true}
            )
       console.log(`Connected to DB ${con.connection.host}`) 
    } catch (error) {
        console.log(`Connection Failed! ${error}`) 
        process.exit(1)
    }
}

module.exports = connectDB;