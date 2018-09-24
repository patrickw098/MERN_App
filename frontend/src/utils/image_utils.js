import axios from "axios";
import { receiveQuery } from "../actions/image_actions";

export const makeQuery = query => dispatch => {
    console.log(query);
    return axios.post('/api/images/search', query)
        .then(payload => {
            // payload.data.photos
            dispatch(receiveQuery(payload.data));
        })
}