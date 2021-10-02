import { GET_USER_DETAILS } from '../types'

const initialState = {
    userDetails : []
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            return {
                ...state,
                userDetails : action.payload
            };
        default:
            return state;
    }
}
