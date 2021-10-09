import { CART, MENU, GET_ALL_RESTAURANT, RESTAURANT, ADD_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS, CHECKOUT } from "../types";

const initialState = {
    restaurantDetails : [],
    selectedRestaurantDetails : [],
    cartItems : [],
    totalAmount : "",
    resIdList : []
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
            const item = state.selectedRestaurantDetails[0].items.find(
                (foodItem) => foodItem.name === action.payload.dishDetails.name
            );
            const inCart = state.cartItems.find((item) =>
            item.name === action.payload.dishDetails.name ? true : false
            );
            // const isResId = state.resIdList.find(id => 
            //     id === state.selectedRestaurantDetails[0].restid)
            return {
                ...state,
                cartItems : inCart
                ? state.cartItems.map((item) =>
                    item.name === action.payload.dishDetails.name ? { ...item, qty: item.qty + 1 }
                      : item
                  ) : [...state.cartItems, {...item, qty : action.payload.qty}],
                resIdList : [...state.resIdList, state.selectedRestaurantDetails[0].restid]
            };
        case ADD_CART:
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
