import { RECEIVE_IMAGES, RECEIVE_QUERY } from '../../actions/image_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/user_actions';

import { imageDefaults } from '../../config/vars';

const imageReducer = (state = imageDefaults, action) => {
    Object.freeze(state);
    console.log(action)
    switch (action.type) {
        case RECEIVE_QUERY:
            return [...action.payload.images];
        case RECEIVE_IMAGES:
            return state.concat(action.payload.images);
        case RECEIVE_CURRENT_USER:
            return imageDefaults;
        default:
            return state;
    }
}

export default imageReducer;