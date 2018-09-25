import { RECEIVE_QUERY, RECEIVE_IMAGES } from '../../actions/image_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/user_actions';

const businessesReducer = (state = {}, action) => {
    Object.freeze(state);  
    switch(action.type) {
        case RECEIVE_IMAGES:
            return Object.assign({}, state, action.payload.businesses);
        case RECEIVE_QUERY: 
            return Object.assign({}, state, action.payload.businesses);
        case RECEIVE_CURRENT_USER:
            return {}
        default:
            return state;
    }
}

export default businessesReducer;