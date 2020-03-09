import { RECEIVE_HOLDING } from "../../actions/holding_actions";

export const holdingsReducer = (state = { holdings: null }, action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_HOLDING:
            return nextState.holdings + action.holdings.quantity
        default:
            return state;
    }
}