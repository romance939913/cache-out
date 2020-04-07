import { RECEIVE_HOLDING_ERRORS, 
            CLEAR_HOLDING_ERRORS, 
            RECEIVE_HOLDING_SUCCESS, } from '../../actions/holding_actions';

export const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case CLEAR_HOLDING_ERRORS:
            return [];
        case RECEIVE_HOLDING_ERRORS:
            if (action.errorsArr !== undefined) return action.errorsArr; 
        case RECEIVE_HOLDING_SUCCESS:
            return ['Success'] 
        default:
            return state;
    }
}