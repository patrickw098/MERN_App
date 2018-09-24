export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_QUERY = "RECEIVE_QUERY";
export const SAVE_CURRENT_QUERY = "SAVE_CURRENT_QUERY";

export const receiveImages = payload => ({
    type: RECEIVE_IMAGES,
    payload
})

export const receiveQuery = payload => ({
    type: RECEIVE_QUERY,
    payload
})

export const saveCurrentQuery = query => ({
    type: SAVE_CURRENT_QUERY,
    query,
})