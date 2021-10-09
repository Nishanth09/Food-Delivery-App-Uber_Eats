import { PLACE_ORDER, GET_ORDERS } from '../types'

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
        default:
            return state;
    }
}
