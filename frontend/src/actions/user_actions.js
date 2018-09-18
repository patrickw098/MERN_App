// action types
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";


// actions
export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

