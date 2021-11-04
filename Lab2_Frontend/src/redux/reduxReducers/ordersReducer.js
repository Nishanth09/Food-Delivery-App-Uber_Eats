import { PLACE_ORDER, GET_ORDERS, GET_CUSTOMER_ORDERS, UPDATE_ORDER } from '../types'

const initialState = {
    msg : "",
    orderDetails : []
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case PLACE_ORDER:
            return {
                ...state,
                msg : action.payload
            };
        case GET_ORDERS:
            return {
                ...state,
                orderDetails : action.payload
            }
        case UPDATE_ORDER:
            return {
                ...state,
                msg : action.payload
            }
        case GET_CUSTOMER_ORDERS:
            return {
                ...state,
                orderDetails : action.payload
            }
        default:
            return state;
    }
}
