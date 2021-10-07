import { CART, RESTAURANT, MENU, ADD_CART, RMV_CART, DELIVERY_RESTAURANTS,
     ERROR } from "../types";
import axios from 'axios';

// export const manageRestaurantRedux = (data) => async dispatch => {
//     await axios.post('/api/restaurant', data)
//     .then(response => {
//         dispatch({
//             type : MANAGE_RESTAURANT,
//             payload : response.data
//         })
//     })
//     .catch(error => {
//         dispatch({
//             type: ERROR,
//             payload: error
//         })
//     });
// }


export const restaurantRedux = (data) => async dispatch => {
    await axios.get('/api/get_all_restaurants', {
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

export const deliveryRedux = () => async dispatch => {
    await axios.get('/api/get_delivery_restaurants')
    .then(response => {
        dispatch({
            type : DELIVERY_RESTAURANTS,
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
    console.log("action cart");
    dispatch({
        type : CART,
        payload : data
    })
}

export const minusCartRedux = (data) => (dispatch) => {
    console.log("action cart");
    dispatch({
        type : RMV_CART,
        payload : data
    })
}

export const plusCartRedux = (data) => (dispatch) => {
    console.log("action cart");
    dispatch({
        type : ADD_CART,
        payload : data
    })
}
