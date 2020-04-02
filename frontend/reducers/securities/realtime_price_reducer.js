import { RECEIVE_REALTIME, CLEAR_REALTIME } from "../../actions/security_actions";

export const realTimePriceReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case CLEAR_REALTIME:
            return [];
        case RECEIVE_REALTIME:
            nextState[action.price.symbol] = action.price;
            return nextState;
        default:
            return state;
    }
}