import { RECEIVE_PROFILE } from "../../actions/security_actions";

export const profileReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_PROFILE:
            return action.profile
        default:
            return state;
    }
}