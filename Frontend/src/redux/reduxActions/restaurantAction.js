import { CART, RESTAURANT, MENU, ADD_CART, RMV_CART, ERROR } from "../types";
import axios from 'axios';

export const restaurantRedux = () => async dispatch => {
    
    await axios.get('http://localhost:3001/getAllRestaurants')
    .then(response => {
        console.log("reducing action restaurant");
        dispatch({
            type : RESTAURANT,
            payload : response.data
        })  
    }) 
    .catch(error => {
        console.log("error recieved from restaurant req", error);
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
