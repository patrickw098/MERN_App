import { RECEIVE_CURRENT_USER } from '../actions/user_actions';

const _nullUser = Object.freeze({
    id: null,
    name: null
})

const sessionReducer = ( state = _nullUser , action ) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            return action.user;
        default: 
            return state;
    }
};

export default sessionReducer;