import axios from 'axios';
import {GET_USER_DETAILS, ERROR} from '../types'

export const getUserDetailsRedux = (data) => async dispatch => {
    await axios.get('/user_details')
    .then((response) => {
        dispatch({
            type : GET_USER_DETAILS,
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