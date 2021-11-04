import { SIGNUP_CUSTOMER, SIGNUP_RESTAURANT } from "../types";

const intialState = {
    response : ""
}

export default function(state = intialState, action) {
    switch (action.type) {
        case SIGNUP_CUSTOMER:
            return {
                ...state,
                response : action.payload
            };
        case SIGNUP_RESTAURANT:
            return {
                ...state,
                response : action.payload
            };
        default:
            return state;
    }
}
