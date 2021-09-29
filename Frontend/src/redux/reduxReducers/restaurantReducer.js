import { CART, MENU, RESTAURANT, ADD_CART, RMV_CART } from "../types";

const initialState = {
    restaurantDetails : [],
    menuDetails : [],
    cartItems : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case RESTAURANT:
            return {
                ...state,
                restaurantDetails : action.payload
            };
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
