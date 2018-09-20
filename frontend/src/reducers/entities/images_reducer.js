import { RECEIVE_IMAGES, RECEIVE_QUERY } from '../../actions/image_actions';

const defaultState = [1,2,3,4,5,6]

const imageReducer = (state = defaultState, action) => {
    Object.freeze(state);
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