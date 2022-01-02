const Order = require('./models/OrderModel')
const Restaurant = require('./models/RestaurantModel')
const User = require("./models/UserModel")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config()

getRestByLocation = async (args) => {
    let results = []
    if (args.city) {
        const restaurantDetails = await Restaurant.find({"location":args.city})
        if (restaurantDetails) {
            for (let restaurant of restaurantDetails) {
                results.push(restaurant)
            }
            return results
        }
    } else {
        const restaurantDetails = await Restaurant.find({})
        if (restaurantDetails) {
            for (let restaurant of restaurantDetails) {
                results.push(restaurant)
            }
            return results
        }
        return results
    }
    }
    
    getAllRestaurants = async () => {
        let results = []
        const restaurantDetails = await Restaurant.find({})
        if (restaurantDetails) {
            for (let restaurant of restaurantDetails) {
                results.push(restaurant)
            }
            return results
        }
        return results
    }
    
    currentUserInfo = async (args, request) => {
        let results = {}
        console.log(request.session.userId)
        const userDetails = await User.find({"_id":request.session.userId})
        if (userDetails) {
            const userObj = Object.assign({},userDetails)
            return userObj['0']
        }
        return results
    }
    
    getRestInfo = async (args) => {
        let results = []
        const resturantDetails = await Restaurant.find({"_id":args.restid})
        if (resturantDetails) {
            for (let restaurant of resturantDetails) {
                results.push(restaurant)
            }
            return results
        }
        return results
    }

    getOwnerRest = async (args, request) => {
        let results = {}
        console.log("==", request.session.userId)
        const restaurantResult = await Restaurant.find({
            ownerid : request.session.userId
        })
        if (restaurantResult) {
            console.log("--",restaurantResult)
            const resObj = Object.assign({},restaurantResult)
            return resObj['0']
        }
        return results
    }
    
    getUserOrders = async (args, request) => {
        let results = []
        const userOrders = await Order.find({"userid":request.session.userId})
        if (userOrders) {
            for (let order of userOrders) {
                results.push(order)
            }
            return results
        }
        return results
    }
    
    getCustOrders = async (args, request) => {
        let results = []
        const restaurantDetails = await Restaurant.findOne({ownerid : request.session.userId})
        if (restaurantDetails) {
            const orderDetails = await Order.find({restid: restaurantDetails._id}).populate('userid')
            if (orderDetails) {
              for (let order of orderDetails) {
                  results.push(order)
              }
              return results
            }
        }
        return results
    }

    placeOrder = async (args, request) => {
        console.log(args.resid)
        console.log(args.orderStatus)
        const userId = request.session.userId
        const restid = args.resid
        const order_status = args.orderStatus
        const order_items = args.orderItems
        const price = args.amount
        const delivery_address = args.deliveryAddress
        const order_time = args.orderTime

        const order = await Order.create({
            userid: userId,
            restid,
            order_status, 
            order_items, 
            price, 
            delivery_address,
            order_time
        })
        if (order) {
            return {"message": "order placed successfully"}
        }
        return {"message": "Order not placed"}
    }

    loginUser = async (args) => {
        let results = {}
        try {
            await User.findOne({ username: args.username }, async (error, user) => {
                if (error) {
                    console.log(error)
                }
                let isValid = false
                try {
                    isValid = await bcrypt.compare(args.password, user.password)
                } catch(error) {
                    console.log(error)
                } 
                if (isValid) {
                    const payload = { _id: user._id, username: user.username};
                    const token = jwt.sign(payload, process.env.secret, {
                        expiresIn: 1008000
                    });
                    console.log(user)
                    results["_id"] = user._id,
                    results["JWT"] = token
                    results["username"] = user.username,
                    results["email"] = user.email,
                    results["account_type"] = user.account_type
                    req.session.userId = user._id
                    return {"message": results}
                }
                else {
                  return {"message": "Unauthorized"}
                }
            })   
        } catch (error) {
            console.log(error)
        }
    }

    signUpUser = async (args) => {
        console.log(args.uname, args.password, args.email, args.dob)
        const username = args.uname
        const password = args.password
        const email = args.email
        const dob = args.dob

        const userExists = await User.findOne({ username })
        if (userExists) {
            return {"message": "User exists"}
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
            return {"message":"User created"}
            } else {
              return {"message": "Resource not found"}
            }
        }
    }

    signUpOwner = async (args) => {
        console.log(args)
        console.log(args.uname, args.password, args.email, args.location)
        const username = args.uname
        const password = args.password
        const email = args.email

        const userExists = await User.findOne({ username })
        if (userExists) {
            console.log("exists")
          return {"message": "User exists"}
        } else {
            console.log("---")
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
                return {"message":"User created"}
            } else {
                return {"message": "Resource not found"}
            }
        }
    }

    updateUserData = async (args, request) => {
        const userId = request.session.userId
        const user = await User.findOneAndUpdate({_id: userId}, args, {new: true})
        if (user) {
            console.log("Updated user details: \n",user)
            return user
        }
        return {}
    }

    updateOrder = async (args) => {
        console.log("---",args)
        const orderDetails = await Order.findOneAndUpdate({_id: args.order_id}, {"order_status": args.order_status}, {new: true})
        if (orderDetails) {
            console.log("Updated order details: \n", orderDetails)
          return orderDetails
        } else {
          return {}
        }
    }
    
    
    //root
    
    exports.root = {
        getRestByLocation : getRestByLocation,
        getAllRestaurants : getAllRestaurants,
        currentUserInfo : currentUserInfo,
        getRestInfo : getRestInfo,
        getOwnerRest: getOwnerRest,
        getUserOrders : getUserOrders,
        getCustOrders : getCustOrders,
        placeOrder: placeOrder,
        signUpUser: signUpUser,
        signUpOwner: signUpOwner,
        updateUserData: updateUserData,
        loginUser: loginUser,
        updateOrder: updateOrder
    }