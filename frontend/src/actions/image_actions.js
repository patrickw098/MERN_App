export const RECEIVE_IMAGES = "RECEIVE_IMAGES";
export const RECEIVE_IMAGE = "RECEIVE_IMAGE";
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

export const receiveImage = payload => ({
    type: RECEIVE_IMAGE,
    payload
})