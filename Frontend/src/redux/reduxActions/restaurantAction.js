import { CART, GET_ALL_RESTAURANT, RESTAURANT, MENU, ADD_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS, CHECKOUT, ERROR } from "../types";
import axios from 'axios';

export const getAllRestaurantsRedux = (data) => async dispatch => {
    await axios.get('/api/get_all_restaurants', {
        params:data
    })
    .then(response => {
        dispatch({
            type : GET_ALL_RESTAURANT,
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

export const getRestaurantRedux = (data) => async dispatch => {
    await axios.get('/api/get_restaurant', {
        params:data
    })
    .then(response => {
        dispatch({
            type : RESTAURANT,
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

export const modeRedux = (data) => async dispatch => {
    dispatch({
        type : MODE_RESTAURANTS,
        payload : data
    })
}

export const deitaryRedux = (data) => async dispatch => {
    dispatch({
        type : DIETARY_RESTAURANTS,
        payload : data
    })
}

export const menuRedux = () => async dispatch => {
    await axios.get('http://localhost:3001/getDishes')
    .then(response => {
        dispatch({
            type : MENU,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    })
}

export const cartRedux = (data) => (dispatch) => {
    dispatch({
        type : CART,
        payload : data
    })
}

export const minusCartRedux = (data) => (dispatch) => {
    dispatch({
        type : RMV_CART,
        payload : data
    })
}

export const plusCartRedux = (data) => (dispatch) => {
    dispatch({
        type : ADD_CART,
        payload : data
    })
}

export const checkoutRedux = (data) => (dispatch) => {
    dispatch({
        type : CHECKOUT,
        payload : data
    })
}