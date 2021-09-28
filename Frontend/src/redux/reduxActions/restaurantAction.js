import { RESTAURANT, MENU, ERROR } from "../types";
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