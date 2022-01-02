const express = require('express')
const session = require('express-session');
require('dotenv').config()
const app = express()
const userRouter = require('./routes/UserRoutes')
const restaurantRouter = require('./routes/RestaurantRoutes')
const orderRouter = require('./routes/OrderRoutes')
const imageRouter = require('./routes/ImageRouter')
const connectDB = require('./config/db')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const fileUpload = require('express-fileupload');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

const { global_schema } = require('./schema.js')
const {root} = require('./resolvers.js')

let schema = buildSchema(global_schema);

connectDB() 

app.use(session({ 
  secret: process.env.secret,
  resave: false,
  saveUninitialized: true,
  duration: 60 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
  store: new MongoStore({ 
    mongoUrl: '',
    ttl: 14 * 24 * 60 * 60 })
}))

app.use(express.json())
app.use((req,res,next) => {
  console.log(`${req.method} rquest for ${req.url}`)
  res.append("Access-Control-Allow-Origin","*")
  res.append("Access-Control-Allow-Header", "*")
  next()
})
app.use(passport.initialize())
app.use(fileUpload())
app.use('/api/users', userRouter)
app.use('/api/restaurant', restaurantRouter)
app.use('/api/order', orderRouter)
app.use('/api', imageRouter)

app.use('/api/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

console.log('Running a GraphQL API server at http://localhost:3001/graphql');
app.listen(3001,console.log("Server Started.."))
 