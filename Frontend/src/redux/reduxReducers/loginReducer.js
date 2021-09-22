import {LOGIN, ERROR} from '../types'

const initialState = {
    user : {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            console.log("reducing action");
            return {
                ...state,
                user : action.payload
            };
        default:
            return state;
    }
}
