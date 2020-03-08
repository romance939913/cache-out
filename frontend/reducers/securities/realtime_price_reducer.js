import { RECEIVE_REALTIME } from "../../actions/security_actions";

export const realTimePriceReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_REALTIME:
            return action;
        default:
            return state;
    }
}