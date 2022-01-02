import {GET_RESTAURANT_DETAILS, MANAGE_RESTAURANT } from '../types'

const initialState = {
    msg : "",
    restaurantDetails : {}
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case MANAGE_RESTAURANT:
            console.log("reducing action");
            return {
                ...state,
                msg : action.payload
            };
        case GET_RESTAURANT_DETAILS:
            console.log("payload : ",action.payload)
            return {
                ...state,
                restaurantDetails : action.payload.data.getOwnerRest
            }
        default:
            return state;
    }
}
