import axios from 'axios';
import {LOGIN_CUSTOMER, LOGIN_RESTAURANT, ERROR} from '../types'

export const loginCustomerRedux = (data) => async dispatch => {
    await axios.post('/api/login', data)
    .then((response) => {
        console.log("action taking place", response);
        dispatch({
            type : LOGIN_CUSTOMER,
            payload : response.data
        })
    })
    .catch(error => {
        console.log("error recieved from login req", error);
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const loginRestaurantRedux = (data) => async dispatch => {
    await axios.post('/api/login', data)
    .then((response) => {
        console.log("action taking place", response);
        dispatch({
            type : LOGIN_RESTAURANT,
            payload : response.data
        })
    })
    .catch(error => {
        console.log("error recieved from login req", error);
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}