import { RECEIVE_HISTORICAL } from "../../actions/graph_actions";

export const historicalShowReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_HISTORICAL:
            return action.prices;
        default:
            return state;
    }
}