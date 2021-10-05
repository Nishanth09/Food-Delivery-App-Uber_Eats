import {GET_RESTAURANT_DETAILS, MANAGE_RESTAURANT } from '../types'

const initialState = {
    msg : "",
    restaurantDetails : []
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
            return {
                ...state,
                restaurantDetails : action.payload
            }
        default:
            return state;
    }
}
