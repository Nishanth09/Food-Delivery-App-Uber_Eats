import axios from 'axios';
import {GET_USER_DETAILS, POST_USER_DETAILS, ERROR} from '../types'

export const getUserDetailsRedux = () => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.get('/api/users/user-details')
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

export const postUserDetailsRedux = (data) => async dispatch => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token')
    await axios.put('/api/users/user-details', data)
    .then((response) => {
        dispatch({
            type : POST_USER_DETAILS,
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
