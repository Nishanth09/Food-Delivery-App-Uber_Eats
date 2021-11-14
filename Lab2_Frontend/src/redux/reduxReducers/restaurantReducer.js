import { CART, MENU, GET_ALL_RESTAURANT, RESTAURANT, LOCATION, ADD_CART, QTY_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS, FAVORITES, GET_FAVORITES, CLEAR_ORDER, CHECKOUT } from "../types";

const initialState = {
    restaurantDetails : [],
    location : "",
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
        case LOCATION:
            return {
                ...state,
                location : action.payload.location
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
            const selItem = state.selectedRestaurantDetails[0].items.find(
                (foodItem) => foodItem.dishName === action.payload.dishDetails.dishName
            );
            const item = {...selItem, instructions: action.payload.dishDetails.instructions}
            const inCart = state.cartItems.find((item) =>
            item.dishName === action.payload.dishDetails.dishName ? true : false
            );
            return {
                ...state,
                cartItems : inCart
                ? state.cartItems.map((item) =>
                    item.dishName === action.payload.dishDetails.dishName ? { ...item, qty: item.qty + 1 }
                      : item
                  ) : [...state.cartItems, {...item, qty : action.payload.qty}],
                resIdList : [...state.resIdList, state.selectedRestaurantDetails[0]._id]
            };
        case QTY_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.dishName === action.payload.dishinfo.dishName
                  ? { ...item, qty: action.payload.qty }
                  : item
              )
            };
        case ADD_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.dishName === action.payload.dishName
                  ? { ...item, qty: item.qty + 1 }
                  : item
              )
            };
        case RMV_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.dishName === action.payload.dishName
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
            let totalAmt = 0
            for (let i = 0; i < (action.payload.price).length; i++) {
                totalAmt += (parseFloat(action.payload.price[i].split('$')[1]) * parseFloat(action.payload.qty[i]))
            }
            return {
                ...state,
                totalAmount : totalAmt.toFixed(2)
            }
        default:
            return state;
    }
}
