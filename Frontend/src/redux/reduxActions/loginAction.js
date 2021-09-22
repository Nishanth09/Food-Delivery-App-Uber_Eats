import axios from 'axios';
import {LOGIN, ERROR} from '../types'

export const loginRedux = (data) => async dispatch => {
    await axios.post('http://localhost:3001/login', data)
    .then((response) => {
        console.log("action taking place", response);
        dispatch({
            type : LOGIN,
            payload : response.data
        })
    })
    .catch(error => {
        console.log("error recieved from login req", error);
        dispatch({
            type: ERROR,
            payload: error
        })
    });
}