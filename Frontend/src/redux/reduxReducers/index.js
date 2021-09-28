import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import cartReducer from './cartReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
    login : loginReducer,
    register : registerReducer,
    cart : cartReducer,
    restaurant : restaurantReducer
})
