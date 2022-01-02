global_schema = `
  type user {
    _id: String,
    userimage: String,
    username: String,
    password: String,
    nickname: String,
    mobile: String,
    email: String,
    street: String,
    city: String,
    country: String,
    state: String,
    zip: String,
    account_type: String,
    address: String,
    dob: String,
  },

  type restaurant{
    _id: String,
    resimg: String,
    ownerid: user,
    name: String,
    items: [item]
    description: String,
    mode: String,
    dietary: String,
    address: String,
    location: String,
    open_timings: String,
    close_timings: String,
  },

  type order {
    _id: String,
    resimg: String,
    userid: user,
    restid: restaurant,
    order_status: String,
    order_items: [item],
    price: String,
    order_time: String,
    delivery_address: String,
  },

  type item{
    _id: String,
    dishimage: String,
    dishName: String,
    description: String,
    ingredients: String,
    price: String,
    category: String,
    qty: String,
    instructions: String,
  }
  
  input oitem {
    _id: String,
    dishimage: String,
    dishName: String,
    description: String,
    ingredients: String,
    price: String,
    category: String,
    qty: String,
    instructions: String,
  }

  type response {
    message : String
  }

  type Query {
    getRestByLocation(city: String): [restaurant],
    getAllRestaurants: [restaurant],
    currentUserInfo: user,
    getRestInfo(restid: String): [restaurant],
    getOwnerRest: restaurant,
    getUserOrders: [order],
    getCustOrders: [order],
 }

 type Mutation {
   loginUser(username: String, password: String): response
   signUpUser(uname: String, password: String, email: String, dob: String): response
   signUpOwner(uname: String, password: String, email: String, location: String): response
   updateUserData(username: String, nickname: String, mobile: String, email: String, address: String,
                  city: String, state: String, zip: String, dob: String, country: String): user
   placeOrder(resid: String, orderStatus: String, orderItems: [oitem], amount: String, orderTime: String,
             deliveryAddress: String): response
   updateOrder(order_id: String, order_status: String): order
 }
`

// postRestaurant(resimage: String, name: String, address: String, location: String, items: [items],
//   mode: String, dietary: String, open_timings: String, close_timings: String}") : response
// updateRestaurant(resimage: String, name: String, address: String, location: String, items: [items],
//     mode: String, dietary: String, open_timings: String, close_timings: String}") : response
// updateRestaurant(): response
exports.global_schema = global_schema