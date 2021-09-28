import { CART } from '../types';

const initialState = {
    cartItems : []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CART:
            console.log("cart reducing");
            return {
                ...state,
                cartItems : action.payload
            };
        default:
            return state;
    }
}