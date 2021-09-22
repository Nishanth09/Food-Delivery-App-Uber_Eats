import { REGISTER } from "../types";

const intialState = {
    details : {}
}

export default function(state = intialState, action) {
    switch (action.type) {
        case REGISTER:
            return {
                ...state,
                details : action.payload
            };
        default:
            return state;
    }
}