import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { receiveCurrentUser, receiveErrors } from '../actions/user_actions';

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const registerUser = user => dispatch => {
    return axios
        .post('/api/users/register', user)
        .then(res => {
            console.log("hey, register", res.data);

            // set token in local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            // set current user with decoded token information
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        });
}

export const loginUser = user => dispatch => {
    return axios
        .post('/api/users/login', user)
        .then(res => {
            // set token in local storage
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);

            // set current user with decoded token information
            const decoded = jwt_decode(token);
            dispatch(receiveCurrentUser(decoded));
        })
        .catch(err => {
            dispatch(receiveErrors(err.response.data));
        });
}

