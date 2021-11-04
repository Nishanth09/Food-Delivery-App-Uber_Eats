import axios from 'axios';
import {LOGOUT_CUSTOMER, LOGOUT_RESTAURANT, ERROR} from '../types';

export const logoutCustomerRedux = () => async dispatch => {
    await axios.get('/api/users/logout')
    .then((response) => {
        dispatch({
            type : LOGOUT_CUSTOMER,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const logoutRestaurantRedux = (data) => async dispatch => {
    await axios.get('/api/users/logout')
    .then((response) => {
        dispatch({
            type : LOGOUT_RESTAURANT,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}