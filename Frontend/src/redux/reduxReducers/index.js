import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import manageRestaurantReducer from './manageRestaurantReducer';
import registerReducer from './registerReducer';
import restaurantReducer from './restaurantReducer';
import userDetailsReducer from './userDetailsReducer';
import { LOGOUT_CUSTOMER } from '../types';

const appReducer = combineReducers({
    login : loginReducer,
    register : registerReducer,
    logout : logoutReducer,
    restaurant : restaurantReducer,
    user : userDetailsReducer,
    manageRestaurant : manageRestaurantReducer
  });
  
  const rootReducer = (state, action) => {
    if (action.type === LOGOUT_CUSTOMER) {
      state = undefined;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;