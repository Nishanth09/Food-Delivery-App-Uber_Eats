import axios from 'axios';
import {GET_USER_DETAILS, UPDATE_USER_DETAILS, ERROR} from '../types'

export const getUserDetailsRedux = () => async dispatch => {
    await axios.get('/api/user_details')
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

export const updateUserDetailsRedux = (data) => async dispatch => {
    await axios.post('/api/user_details', data)
    .then((response) => {
        dispatch({
            type : UPDATE_USER_DETAILS,
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