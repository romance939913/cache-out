import { RECEIVE_HOLDING_ERRORS, CLEAR_HOLDING_ERRORS, } from '../../actions/holding_actions';

export const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLEAR_HOLDING_ERRORS:
            return [];
        case RECEIVE_HOLDING_ERRORS:
            if (action.errorsArr !== undefined) return action.errorsArr;  
        default:
            return state;
    }
}