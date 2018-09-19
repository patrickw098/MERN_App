import { CLOSE_MODAL, REGISTER } from '../actions/modal_actions';
import { RECEIVE_ERRORS } from '../actions/user_actions';

const defaultState = {
    modal: null,
    errors: null,
}

const uiReducer = (state = defaultState, action) => {
    switch(action.type) {
        case REGISTER:
            return Object.assign({}, state, { modal: action.text })
        case CLOSE_MODAL:
            return Object.assign({}, state, { modal: null, errors: null })
        case RECEIVE_ERRORS:
            return Object.assign({}, state, { errors: action.errors })
        default: 
            return defaultState
    }
}

export default uiReducer;