import { RECEIVE_IMAGES, RECEIVE_QUERY } from '../../actions/image_actions';

import { imageDefaults } from '../../config/vars';

const imageReducer = (state = imageDefaults, action) => {
    Object.freeze(state);
    console.log(action)
    switch (action.type) {
        case RECEIVE_QUERY:
            return [...action.payload.images]
        case RECEIVE_IMAGES:
            return [state.images, ...action.payload.images]
        default:
            return state;
    }
}

export default imageReducer;