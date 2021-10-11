import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import manageRestaurantReducer from './manageRestaurantReducer';
import registerReducer from './registerReducer';
import restaurantReducer from './restaurantReducer';
import userDetailsReducer from './userDetailsReducer';
import { LOGOUT_CUSTOMER, LOGOUT_RESTAURANT, PLACE_ORDER } from '../types';
import ordersReducer from './ordersReducer';

const appReducer = combineReducers({
    login : loginReducer,
    register : registerReducer,
    logout : logoutReducer,
    restaurant : restaurantReducer,
    user : userDetailsReducer,
    manageRestaurant : manageRestaurantReducer,
    order : ordersReducer
  });
  
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT_CUSTOMER || action.type === PLACE_ORDER || action.type === LOGOUT_RESTAURANT) {
      state = undefined;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;