import { RECEIVE_HOLDING_ERRORS, GET_HOLDINGS, RECEIVE_HOLDING } from '../../actions/holding_actions';

export const transactionErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_HOLDINGS:
            return [];
        case RECEIVE_HOLDING:
            return [];
        case RECEIVE_HOLDING_ERRORS:
            return action.errorsArr;    
        default:
            return state;
    }
}