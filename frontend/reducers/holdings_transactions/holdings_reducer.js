import { RECEIVE_HOLDING } from "../../actions/holding_actions";

export const holdingsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HOLDING:
            return action.holding
        default:
            return state;
    }
}