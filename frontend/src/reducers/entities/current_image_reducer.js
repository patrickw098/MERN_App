import { RECEIVE_IMAGE } from '../../actions/image_actions';
import { imageDefaults } from '../../config/vars';

const currentImageReducer = (state = imageDefaults, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_IMAGE:
            return [action.payload];
        default:
            return state;
    }
}

export default currentImageReducer;