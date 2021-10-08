import { CART, MENU, GET_ALL_RESTAURANT, RESTAURANT, ADD_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS } from "../types";

const initialState = {
    restaurantDetails : [],
    menuDetails : [],
    cartItems : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_RESTAURANT:
            return {
                ...state,
                restaurantDetails : action.payload
            };
        case RESTAURANT:
            console.log("redce", action.payload)
            return {
                ...state,
                menuDetails : action.payload
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
            console.log("reducer d", action.payload)
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
            const item = state.menuDetails.find(
                (foodItem) => foodItem.id === action.payload.id
            );
            const inCart = state.cartItems.find((item) =>
            item.id === action.payload.id ? true : false
            );
            return {
                ...state,
                cartItems : inCart
                ? state.cartItems.map((item) =>
                    item.id === action.payload.id
                      ? { ...item, qty: item.qty + 1 }
                      : item
                  ) : [...state.cartItems, {...item, qty : 1}]
            };
        case ADD_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.id === action.payload.id
                  ? { ...item, qty: item.qty + 1 }
                  : item
              )
            };
        case RMV_CART:
            return {
                ...state,
                cartItems : state.cartItems.map((item) =>
                item.id === action.payload.id
                  ? { ...item, qty: item.qty - 1 }
                  : item
              )
            };
        default:
            return state;
    }
}
