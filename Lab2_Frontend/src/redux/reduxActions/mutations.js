
const signUpUser = (data) => {
    return `mutation{
        signUpUser(uname: "${data.username}", 
                  password:"${data.password}",
                  email: "${data.email}",
                  dob:"${data.dob}") {
                  message
      }}`
}

const signUpOwner = (data) => {
    return `mutation{
            signUpOwner(uname: "${data.username}", 
                  password:"${data.password}",
                  email: "${data.email}",
                  location:"${data.city}") {
                  message
            }}`
}

const loginUser = (data) => {
    return `mutation{
            loginUser(uname: "${data.username}", 
                password:"${data.password}") {
                message
            }}`
}

const updateUserData = (data) => {
    console.log(data)
    return `mutation {
            updateUserData(username: "${data.username}", nickname: "${data.nickname}", mobile: "${data.mobile}",
                    email: "${data.email}", address: "${data.street}", city: "${data.city}", state: "${data.state}",
                    zip: "${data.zip}", dob: "${data.dob}", country: "${data.country}") {
                    username
                    nickname
                    email
                    mobile
                    dob
                    city
                    state
                    address
                    zip 
                    country
                }
            }`
}

const placeOrder = (data) => {
    return `mutation {
            placeOrder(resid: "${data.restid}", orderStatus: "${data.order_status}", 
            orderItems: ${data.order_items}, amount: "${data.price}", 
                           orderTime: "${data.order_time}", deliveryAddress: "${data.delivery_address}") {
                    message
                }
            }`
}

const postRestaurant = (data) => {
    return `mutation {
        postRestaurant(resimage: "${data.resimage}", name: "${data.name}", 
            address: ${data.address}, location: "${data.location}", items: "${data.items}",
            mode:"${data.mode}", dietary:"${data.dietary}", open_timings: "${data.open_timings}", 
            close_timings: "${data.close_timings}") {
                message
            }
        }`
}

const updateRestaurant = (data) => {
    return `mutation {
        postRestaurant(resimage: "${data.resimage}", name: "${data.name}", 
            address: ${data.address}, location: "${data.location}", items: "${data.items}",
            mode:"${data.mode}", dietary:"${data.dietary}", open_timings: "${data.open_timings}", 
            close_timings: "${data.close_timings}") {
                message
            }
        }`
}

const updateOrder = (data) => {
    console.log(data,'-----')
    return `mutation {
        updateOrder(order_id: "${data.orderid}", order_status: "${data.order_status}") {
            order_items {
                dishName
                price
                category
              }
              order_status
            }
        }`
}

module.exports= { signUpUser, signUpOwner, updateUserData,
                  placeOrder, updateOrder, postRestaurant, 
                  updateRestaurant, loginUser }