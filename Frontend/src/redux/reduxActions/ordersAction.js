import axios from 'axios';
import {PLACE_ORDER, GET_ORDERS, GET_CUSTOMER_ORDERS, UPDATE_ORDER, ERROR} from '../types'

export const placeOrderRedux = (data) => async dispatch => {
    await axios.post('/api/order', data)
    .then((response) => {
        dispatch({
            type : PLACE_ORDER,
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

export const updateOrderRedux = (data) => async dispatch => {
    await axios.post('/api/order_update', data)
    .then((response) => {
        dispatch({
            type : UPDATE_ORDER,
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

export const getOrdersRedux = () => async dispatch => {
    await axios.get('/api/get_orders')
    .then((response) => {
        dispatch({
            type : GET_ORDERS,
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

export const getCustomerOrdersRedux = () => async dispatch => {
    await axios.get('/api/get_customer_orders')
    .then((response) => {
        dispatch({
            type : GET_CUSTOMER_ORDERS,
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
