let connection =  new require('./kafka/connection')

const connectDB = require('./config/db')
connectDB()

let signupUser = require('./services/signupUser')
let signupOwner = require('./services/signupOwner')
let login = require('./services/login')
let postRestaurantDetails = require('./services/postRestaurantDetails')
let getRestaurantDetails = require('./services/getRestaurantDetails')
let getAllRestaurantDetails = require('./services/getAllRestaurantDetails')
let getSelectedRestaurant = require('./services/getSelectedRestaurant')
let postOrder = require('./services/postOrder')
let updateOrder = require('./services/updateOrder')
let getOrders = require('./services/getOrders')
let getCustomerOrders = require('./services/getCustomerOrders')
let updateRestaurantDetails = require('./services/updateRestaurantDetails')
let getUserDetails = require('./services/getUserDetails')
let updateUserDetails = require('./services/updateUserDetails')
let favoriteRestaurants = require('./services/favoriteRestaurants')
let getFavoriteRestaurants = require('./services/getFavoriteRestaurants')

function handleTopicRequest(topic_name,fname) {
    let consumer = connection.getConsumer(topic_name)
    let producer = connection.getProducer()
    console.log('server is running ')
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname)
        console.log(JSON.stringify(message.value))
        let data = JSON.parse(message.value)
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+ res + err)
            let payloads = [
                    { 
                        topic: data.replyTo,
                        messages:JSON.stringify({
                            correlationId:data.correlationId,
                            data : res
                        }),
                        partition : 0,
                    }
                ]
            producer.send(payloads, function(err, data){
                console.log(data)
            });
            return;
        });
        
    });
}

handleTopicRequest("signup-user", signupUser)
//handleTopicRequest("signup-owner", signupOwner)
handleTopicRequest("login", login)
// handleTopicRequest("post-restaurant", postRestaurantDetails)
// handleTopicRequest("get-restaurant", getRestaurantDetails)
handleTopicRequest("get-all-restaurants", getAllRestaurantDetails)
// handleTopicRequest("get-selected-restaurant", getSelectedRestaurant)
// handleTopicRequest("post-order", postOrder)
// handleTopicRequest("update-order", updateOrder)
// handleTopicRequest("get-orders", getOrders)
// handleTopicRequest("get-customer-orders", getCustomerOrders)
// handleTopicRequest("update-restaurant", updateRestaurantDetails)
// handleTopicRequest("update-user", updateUserDetails)
// handleTopicRequest("favorites", favoriteRestaurants)
// handleTopicRequest("get-favorites", getFavoriteRestaurants)
handleTopicRequest("user-details", getUserDetails)
