import { RECEIVE_STOCKS } from "../../actions/security_actions";

export const securitiesReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_STOCKS:
            action.stocks.map(stock => nextState[stock.symbol] = stock);
            return nextState;  
        default:
            return state;
    }
}