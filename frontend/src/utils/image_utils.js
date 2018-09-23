import axios from "axios";
import { receiveQuery } from "../actions/image_actions";

export const makeQuery = query => dispatch => {
    console.log(query);
    return axios.get('/api/images/search', query)
        .then(res => {
            dispatch(receiveQuery(res.data))
        })
}