import axios from 'axios';
import {LOGIN_CUSTOMER, LOGIN_RESTAURANT, ERROR} from '../types'

export const loginCustomerRedux = (data) => async dispatch => {
    await axios.post('/api/users/login', data)
    .then((response) => {
        dispatch({
            type : LOGIN_CUSTOMER,
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

export const loginRestaurantRedux = (data) => async dispatch => {
    await axios.post('/api/users/login', data)
    .then((response) => {
        dispatch({
            type : LOGIN_RESTAURANT,
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