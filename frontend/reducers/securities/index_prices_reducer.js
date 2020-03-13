import { RECEIVE_INDEXES, RECEIVE_INDEX_PRICES } from "../../actions/security_actions";

export const indexPricesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_INDEX_PRICES:
            return action;
        default:
            return state;
    }
}