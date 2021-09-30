import {LOGIN, RESTAURANT_LOGIN} from '../types'

const initialState = {
    userDetails : []
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log("reducing action");
            return {
                ...state,
                userDetails : [action.payload]
            };
        case RESTAURANT_LOGIN:
            return {
                ...state,
                userDetails : [action.payload]
            }
        default:
            return state;
    }
}
