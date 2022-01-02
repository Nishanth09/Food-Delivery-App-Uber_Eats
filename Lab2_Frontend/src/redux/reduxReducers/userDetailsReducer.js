import { GET_USER_DETAILS, POST_USER_DETAILS } from '../types'

const initialState = {
    userDetails : {},
    msg : ""
}; 

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_USER_DETAILS:
            console.log("user reducer : ",action.payload.data)
            return {
                ...state,
                userDetails : action.payload.data.currentUserInfo
            }
        case POST_USER_DETAILS:
            return {
                ...state,
                msg : action.payload
            }
        default:
            return state;
    }
}
