import { SIGNUP_CUSTOMER, SIGNUP_RESTAURANT, ERROR } from "../types";

const intialState = {
    response : ""
}

export default function(state = intialState, action) {
    switch (action.type) {
        case SIGNUP_CUSTOMER:
            console.log("reducer signup...", action.payload)
            return {
                ...state,
                response : action.payload.data.signUpUser
            };
        case SIGNUP_RESTAURANT:
            return {
                ...state,
                response : action.payload.data.signUpOwner
            };
        case ERROR:
            console.log("reducer signup...", action.payload)
            return state;
        default:
            return state;
    }
}
