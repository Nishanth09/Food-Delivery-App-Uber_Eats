const mongoose =  require('mongoose')
require('dotenv').config()
const connectDB = async () =>{
    try {
            const con = await mongoose.connect('mongodb+srv://nishanth_09:'+ process.env.MONGO_ATLAS_PW +'@ubereats.d660n.mongodb.net/uberEats?retryWrites=true&w=majority',
            {useUnifiedTopology:true,useNewUrlParser:true}
            )
       console.log(`Connected to DB ${con.connection.host}`) 
    } catch (error) {
        console.log(`Connection Failed! ${error}`) 
        process.exit(1)
    }
}

module.exports = connectDB;