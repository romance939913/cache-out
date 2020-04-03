import {
    RECEIVE_SNAPSHOTS,
    CLEAR_GRAPH_PRICES
} from "../../actions/graph_actions";

export const graphSnapshotReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SNAPSHOTS:
            return action.snapshots;
        case CLEAR_GRAPH_PRICES:
            return [];
        default:
            return state;
    }
}