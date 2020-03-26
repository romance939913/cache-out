import { UPDATE_BUYING_POWER, GET_USER } from "../../actions/holding_actions";

export const cashReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case GET_USER:
            return action.user.buying_power
        case UPDATE_BUYING_POWER:
            return action.user.buying_power;
        default:
            return state;
    }
};