import { setAuthToken } from '../utils/session_api_utils';


// action types
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";

// actions
export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
})

export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');

    // Remove auth header for future requests
    setAuthToken(false);

    // Set current user to {} which will set isAuthenticated to false
    dispatch(receiveCurrentUser({}));
};