import {LOGOUT_CUSTOMER, LOGOUT_RESTAURANT} from '../types';

const initialState = {
    response : ""
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGOUT_CUSTOMER:
            return {
                ...state,
                response : action.payload
            };
        case LOGOUT_RESTAURANT:
            return {
                ...state,
                response : action.payload
            }
        default:
            return state;
    }
}
