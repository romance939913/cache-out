import { RECEIVE_FINANCIALS } from "../../actions/security_actions";

export const financialsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FINANCIALS:
            let mktCap = action.financials[1][0]['mktCap'];
            action.financials[0][0]['mktCap'] = mktCap;
            return action.financials[0][0];
        default:
            return state;
    }
}