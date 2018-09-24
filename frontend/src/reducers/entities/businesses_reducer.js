import { RECEIVE_QUERY, RECEIVE_IMAGES } from '../../actions/image_actions';

const businessesReducer = (state = [], action) => {
    Object.freeze(state);  
    switch(action.type) {
        case RECEIVE_IMAGES:
            return [state, ...action.payload.businesses];
        case RECEIVE_QUERY: 
            return [...action.payload.businesses];
        default:
            return state;
    }
}

export default businessesReducer;