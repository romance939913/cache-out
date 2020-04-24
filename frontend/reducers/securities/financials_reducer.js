import { RECEIVE_FINANCIALS } from "../../actions/security_actions";

export const financialsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FINANCIALS:
            return action.financials.financials[0];
        default:
            return state;
    }
}