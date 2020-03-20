import { RECEIVE_HOLDING_ERRORS, GET_HOLDINGS, RECEIVE_HOLDING } from '../../actions/holding_actions';

export const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HOLDING_ERRORS:
            return action.errorsArr;    
        case GET_HOLDINGS:
            return [];
        case RECEIVE_HOLDING:
            return [];
        default:
            return state;
    }
}