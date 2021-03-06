import { CART, GET_ALL_RESTAURANT, RESTAURANT, LOCATION, MENU, ADD_CART, QTY_CART, RMV_CART, MODE_RESTAURANTS,
    DIETARY_RESTAURANTS, CHECKOUT, FAVORITES, GET_FAVORITES, CLEAR_ORDER, ERROR } from "../types";
import axios from 'axios';
import { getRestaurantByLocation, getRestInfo } from "./query";

export const getAllRestaurantsRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // axios.get('/api/restaurant/all-restaurants', {
    //     params:data
    // })
    // .then(response => {
    //     dispatch({
    //         type : GET_ALL_RESTAURANT,
    //         payload : response.data
    //     })  
    // })
    // .catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // });
        const query =  getRestaurantByLocation(data)
        await axios.post('/api/graphql', {
            'query': query
        },
        {
            headers: {
            'Content-Type': 'application/json',
            }
        }).then((response) => {
            dispatch({
                type : GET_ALL_RESTAURANT,
                payload : response.data
            })
        }).catch(error => {
            dispatch({
                type: ERROR,
                payload: error
            })
        });
}

export const getRestaurantRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    // axios.get('/api/restaurant/selected-restaurant', {
    //     params:data
    // })
    // .then(response => {
    //     dispatch({
    //         type : RESTAURANT,
    //         payload : response.data
    //     })  
    // })
    // .catch(error => {
    //     dispatch({
    //         type: ERROR,
    //         payload: error
    //     })
    // });
    // console.log("data restid: ", data.restid)
    const query =  getRestInfo(data)
    await axios.post('/api/graphql', {
        'query': query
    },
    {
        headers: {
          'Content-Type': 'application/json',
        }
    }).then((response) => {
        dispatch({
            type : RESTAURANT,
            payload : response.data
        })
      }).catch(error => {
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}

export const favRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.put('/api/users/favorites', data)
    .then((response) => {
        dispatch({
            type : FAVORITES,
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

export const getFavRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.get('/api/users/favorites', data)
    .then((response) => {
        dispatch({
            type : GET_FAVORITES,
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

export const locationRedux = (data) => async dispatch => {
    dispatch({
        type : LOCATION,
        payload : data
    })
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

export const cartRedux = (data) => async (dispatch) => {
    dispatch({
        type : CART,
        payload : data
    })
}

export const qtyRedux = (data) => async (dispatch) => {
    dispatch({
        type : QTY_CART,
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

export const clearOrderRedux = () => (dispatch) => {
    dispatch({
        type : CLEAR_ORDER,
        payload : "order cleared"
    })
}

export const checkoutRedux = (data) => (dispatch) => {
    dispatch({
        type : CHECKOUT,
        payload : data
    })
}
