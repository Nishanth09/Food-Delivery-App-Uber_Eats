import axios from 'axios';
import {MANAGE_RESTAURANT, GET_RESTAURANT_DETAILS, ERROR} from '../types'

export const postRestaurantRedux = (data) => async dispatch => {
    await axios.post('/api/restaurant', data)
    .then((response) => {
        console.log("action taking place", response);
        dispatch({
            type : MANAGE_RESTAURANT,
            payload : response.data
        })
    })
    .catch(error => {
        console.log("error recieved from res req", error);
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const putRestaurantRedux = (data) => async dispatch => {
    await axios.put('/api/restaurant', data)
    .then((response) => {
        console.log("action taking place", response);
        dispatch({
            type : MANAGE_RESTAURANT,
            payload : response.data
        })
    })
    .catch(error => {
        console.log("error recieved from res req", error);
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const getRestaurantDetailsRedux = () => async dispatch => {
    await axios.get('/api/restaurant')
    .then((response) => {
        dispatch({
            type : GET_RESTAURANT_DETAILS,
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