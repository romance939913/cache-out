import { GET_HOLDINGS, RECEIVE_HOLDING } from "../../actions/holding_actions";

export const holdingReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case GET_HOLDINGS:
            return action.holdings;
        case RECEIVE_HOLDING:
            if (action.holding !== undefined) {
                nextState[Object.keys(action.holding)[0]] = Object.values(action.holding)[0]
            } else {
                return nextState;
            }
        default:
            return state;
    }
};