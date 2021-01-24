import { GET_TRANSACTIONS, RECEIVE_TRANSACTION } from "../../actions/transaction_actions";

export const transactionReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case GET_TRANSACTIONS:
            debugger
            return action;
        case RECEIVE_TRANSACTION:
            debugger
            return action
        default:
            return state;
    }
};