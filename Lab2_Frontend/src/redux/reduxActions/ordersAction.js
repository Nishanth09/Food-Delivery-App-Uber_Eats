import axios from 'axios';
import {PLACE_ORDER, GET_ORDERS, GET_CUSTOMER_ORDERS, UPDATE_ORDER, ERROR} from '../types'

export const placeOrderRedux = (data) => async dispatch => {
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
    await axios.post('/api/order/update-order', data)
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
    await axios.get('/api/order/fetch-orders')
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
