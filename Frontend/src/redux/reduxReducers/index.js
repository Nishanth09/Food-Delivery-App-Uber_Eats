import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import manageRestaurantReducer from './manageRestaurantReducer';
import registerReducer from './registerReducer';
import restaurantReducer from './restaurantReducer';
import userDetailsReducer from './userDetailsReducer';

export default combineReducers({
    login : loginReducer,
    register : registerReducer,
    logout : logoutReducer,
    restaurant : restaurantReducer,
    user : userDetailsReducer,
    manageRestaurant : manageRestaurantReducer
})
