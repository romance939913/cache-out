import { RECEIVE_ERRORS, RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from '../../actions/session_actions';

export const sessionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_ERRORS:
            return action.errorsArr;
        case RECEIVE_CURRENT_USER:
            return [];
        case CLEAR_SESSION_ERRORS:
            return [];
        default:
            return state;
    }
}