import axios from "axios";
import { receiveQuery } from "../actions/image_actions";

export const makeQuery = query => dispatch => {
    console.log(query);
    return axios.post('/api/images/search', query)
        .then(payload => {
            // payload.data.photos
            console.log(payload.data);
            dispatch(receiveQuery(payload.data));
        })
}