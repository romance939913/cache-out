import { RECEIVE_INDEXES } from "../../actions/security_actions";

export const indexesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_INDEXES:
            return action.indexes;
        default:
            return state;
    }
}