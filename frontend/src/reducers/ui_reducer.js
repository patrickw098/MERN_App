import { CLOSE_MODAL, REGISTER } from '../actions/modal_actions';

const defaultState = {
    modal: null,
}

const uiReducer = (state = defaultState, action) => {
    switch(action.type) {
        case REGISTER:
            return Object.assign({}, state, { modal: action.text })
        case CLOSE_MODAL:
            return Object.assign({}, state, { modal: null })
        default: 
            return defaultState
    }
}

export default uiReducer;