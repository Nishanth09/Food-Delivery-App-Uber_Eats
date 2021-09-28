import { MENU, RESTAURANT } from "../types";

const initialState = {
    restaurantDetails : [],
    menuDetails : []
}

export default function(state = initialState, action) {
    switch (action.type) {
        case RESTAURANT:
            return {
                ...state,
                restaurantDetails : action.payload
            };
        case MENU:
            return {
                ...state,
                menuDetails : action.payload
            }
        default:
            return state;
    }
}
