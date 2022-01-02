
const getUserDetails = () => {
    return `query{currentUserInfo {
        _id
        username
        password
        email
        account_type
        dob
        userimage
    }}`
}

const getRestaurantByLocation = (data) => {
    if (data.location) {
        return `{getRestByLocation(city: "${data.location}") {
            _id
            ownerid {
                _id
            }
            name
            items {
                dishName
                dishimage
                description
                ingredients
                price
                category
            }
            mode
            dietary
            address
            location
            open_timings
            close_timings
            description
            resimg
        }}`
    } else {
        return `{getRestByLocation {
                    _id
                    ownerid {
                        _id
                    }
                    name
                    items {
                        dishName
                        dishimage
                        description
                        ingredients
                        price
                        category
                    }
                    mode
                    dietary
                    address
                    location
                    open_timings
                    close_timings
                    description
                    resimg
                }}`
    }
}

const getRestInfo = (data) => {
    return `{getRestInfo(restid: "${data.restid}") {
                _id
                ownerid {
                    _id
                }
                name
                items {
                    dishName
                    dishimage
                    description
                    ingredients
                    price
                    category
                }
                mode
                dietary
                address
                location
                open_timings
                close_timings
                description
                resimg
            }}`
}

const getOwnerRestInfo = () => {
    return `{getOwnerRest {
                _id
                ownerid {
                    _id
                }
                name
                items {
                    dishName
                    dishimage
                    description
                    ingredients
                    price
                    category
                }
                mode
                dietary
                address
                location
                open_timings
                close_timings
                description
                resimg
            }}`
}

const getOrders = () => {
    return `{getUserOrders {_id, userid {
            _id
        },restid {
            _id
        },order_status,order_items {dishName,dishimage,description,ingredients,price,category,instructions,qty
        },price,delivery_address,order_time
    }}`
}

const getCustomerOrders = () => {
    return `{getCustOrders {_id, userid {_id},restid {
            _id
            },order_status,order_items {dishName,dishimage,description,ingredients,price,category,instructions,qty
            },price,delivery_address,order_time
        }}`
}

module.exports= { getUserDetails, getRestaurantByLocation, getRestInfo, 
                  getOwnerRestInfo, getOrders, getCustomerOrders }