import { ERROR, SIGNUP_CUSTOMER, SIGNUP_RESTAURANT } from "../types";
import axios from 'axios';

export const registerCustomerRedux = (data) => async dispatch =>{
    await axios.post('api/users/signup-user', data)
    .then(response => {
        dispatch({
            type : SIGNUP_CUSTOMER,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : ERROR,
            payload : error
        })
    })
}

export const registerRestaurantRedux = (data) => async dispatch =>{
    await axios.post('api/users/signup-owner', data)
    .then(response => {
        dispatch({
            type : SIGNUP_RESTAURANT,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type : ERROR,
            payload : error
        })
    })
}