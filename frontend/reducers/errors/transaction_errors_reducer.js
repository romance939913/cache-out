import { RECEIVE_HOLDING_ERRORS, GET_HOLDINGS, GET_HOLDING } from '../../actions/holding_actions';

export const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_HOLDINGS:
            return [];
        case GET_HOLDING:
            debugger
            return [];
        case RECEIVE_HOLDING_ERRORS:
            if (action.errorsArr !== undefined) return action.errorsArr;  
        default:
            return state;
    }
}