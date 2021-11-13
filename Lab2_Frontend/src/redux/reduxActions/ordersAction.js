import axios from 'axios';
import {PLACE_ORDER, GET_ORDERS, GET_CUSTOMER_ORDERS, UPDATE_ORDER, ERROR} from '../types'

export const placeOrderRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.post('/api/order/add-order', data)
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
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.put('/api/order/update-order', data)
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

export const getOrdersRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.get('/api/order/fetch-orders', {
        params:data
    })
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
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.get('/api/order/customer-orders')
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
