import axios from "axios";
import { receiveQuery, receiveImages } from "../actions/image_actions";

export const makeQuery = query => dispatch => {
    console.log(query);
    return axios.post('/api/images/search', query)
        .then(payload => {
            // payload.data.photos
            console.log(payload.data);
            dispatch(receiveQuery(payload.data));
        })
}

export const getMoreImages = businesses => dispatch => {
    console.log(businesses);

    return axios.post('/api/images/buffer', businesses)
        .then(payload => {
            console.log(payload.data);
            dispatch(receiveImages(payload.data));
        })
}