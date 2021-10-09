import axios from 'axios';
import {PLACE_ORDER, GET_ORDERS, ERROR} from '../types'

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
