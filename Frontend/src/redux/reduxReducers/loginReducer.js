import {LOGIN_CUSTOMER, LOGIN_RESTAURANT } from '../types'

const initialState = {
    userDetails : []
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_CUSTOMER:
            console.log("reducing action");
            return {
                ...state,
                userDetails : action.payload
            };
        case LOGIN_RESTAURANT:
            return {
                ...state,
                userDetails : action.payload
            }
        default:
            return state;
    }
}
