import { GET_TRANSACTIONS, RECEIVE_TRANSACTION } from "../../actions/transaction_actions";

export const transactionReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case GET_TRANSACTIONS:
            return action.transactions;
        case RECEIVE_TRANSACTION:
            return nextState
        default:
            return state;
    }
};