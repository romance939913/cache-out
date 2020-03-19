import { UPDATE_BUYING_POWER } from "../../actions/holding_actions";

export const cashReducer = (state = [], action) => {
    Object.freeze(state);
    debugger
    switch (action.type) {
        case UPDATE_BUYING_POWER:
            return action;
        default:
            return state;
    }
};