import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import restaurantReducer from './restaurantReducer';

export default combineReducers({
    login : loginReducer,
    register : registerReducer,
    restaurant : restaurantReducer
})
