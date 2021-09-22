import { ERROR, REGISTER } from "../types";
import axios from 'axios';

export const registerRedux = (data) => async dispatch =>{
    await axios.post('http://localhost:3001/signup', data)
    .then(response => {
        console.log("Action in action");
        dispatch({
            type : REGISTER,
            payload : response
        })
    })
    .catch(error => {
        dispatch({
            type : ERROR,
            payload : error
        })
    })
}