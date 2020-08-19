import { RECEIVE_FINANCIALS } from "../../actions/security_actions";

export const financialsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_FINANCIALS:
            if (action.financials[0][0]) {
                action.financials[0][0]['mktCap'] = action.financials[1][0]['mktCap'];
                action.financials[0][0]['volAvg'] = action.financials[1][0]['volAvg'];
                action.financials[0][0]['lastDiv'] = action.financials[1][0]['lastDiv'];
                return action.financials[0][0];
            }
        default:
            return state;
    }
}