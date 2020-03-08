import { RECEIVE_wEEK } from "../../actions/graph_actions";

export const weekShowReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_wEEK:
            return action.prices;
        default:
            return state;
    }
}