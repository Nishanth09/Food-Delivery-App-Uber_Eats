import { CART, MENU, GET_ALL_RESTAURANT, RESTAURANT, ADD_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS, FAVORITES, GET_FAVORITES, CLEAR_ORDER, CHECKOUT } from "../types";

const initialState = {
    restaurantDetails : [],
    favRes : [],
    selectedRestaurantDetails : [],
    cartItems : [],
    totalAmount : "",
    resIdList : [],
    msg : "",
    clearStatus : ""
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESTAURANT:
            return {
                ...state,
                restaurantDetails : action.payload
            };
        case RESTAURANT:
            return {
                ...state,
                selectedRestaurantDetails : action.payload
            }
        case FAVORITES:
            return {
                ...state,
                msg : action.payload
            }
        case GET_FAVORITES:
            return {
                ...state,
                favRes : action.payload
            }
        case MODE_RESTAURANTS:
            const resItems = state.restaurantDetails.filter(
                restaurant => restaurant.mode === action.payload.mode 
            )
            return {
                ...state,
                restaurantDetails : resItems
            }
        case DIETARY_RESTAURANTS:
            const rItems = state.restaurantDetails.filter(
                restaurant => restaurant.dietary === action.payload.dietary 
            )
            return {
                ...state,
                restaurantDetails : rItems
            }
        case MENU:
            return {
                ...state,
                menuDetails : action.payload
            }
        case CART:
            console.log("payL : ", action.payload)
            //let payL = action.payload.dishDetails; 
            // let item = {}
            // for (let it of state.selectedRestaurantDetails[0].items) {
            //     if (it.dishName === action.payload.dishName) {
            //         item = Object.assign(item, action.payload.dishDetails)
            //     }
            // }
            const selItem = state.selectedRestaurantDetails[0].items.find(
                (foodItem) => foodItem.dishName === action.payload.dishDetails.dishName
            );
            const item = {...selItem, instructions: action.payload.dishDetails.instructions}
            console.log("item : ", item)
            const inCart = state.cartItems.find((item) =>
            item.dishName === action.payload.dishDetails.dishName ? true : false
            );
            // const isResId = state.resIdList.find(id => 
            //     id === state.selectedRestaurantDetails[0].restid)
            return {
                ...state,
                cartItems : inCart
                ? state.cartItems.map((item) =>
                    item.dishName === action.payload.dishDetails.dishName ? { ...item, qty: item.qty + 1 }
                      : item
                  ) : [...state.cartItems, {...item, qty : action.payload.qty}],
                resIdList : [...state.resIdList, state.selectedRestaurantDetails[0]._id]
            };
        case ADD_CART:
            console.log(state)
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.name === action.payload.name
                  ? { ...item, qty: item.qty + 1 }
                  : item
              )
            };
        case RMV_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.name === action.payload.name
                  ? { ...item, qty: item.qty - 1 }
                  : item
              )
            };
        case CLEAR_ORDER:
            return {
                ...state,
                clearStatus : action.payload
            };
        case CHECKOUT:
            console.log(action.payload,"+++++++")
            let totalAmt = 0
            for (let i = 0; i < (action.payload.price).length; i++) {
                totalAmt += (parseFloat(action.payload.price[i].split('$')[1]) * parseFloat(action.payload.qty[i]))
            }
            console.log(":::",totalAmt)
            return {
                ...state,
                totalAmount : totalAmt.toFixed(2)
            }
        default:
            return state;
    }
}
