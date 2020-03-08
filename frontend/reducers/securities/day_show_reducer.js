import { RECEIVE_DAY } from "../../actions/graph_actions";

export const dayShowReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_DAY:
            return action.prices;
        default:
            return state;
    }
}