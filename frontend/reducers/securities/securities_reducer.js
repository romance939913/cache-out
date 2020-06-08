import { RECEIVE_STOCKS } from "../../actions/security_actions";

export const securitiesReducer = (state = [], action) => {
    Object.freeze(state);
    let pojo = {};
    switch (action.type) {
        case RECEIVE_STOCKS:
            action.stocks.map(stock => pojo[stock.symbol] = stock);
            return pojo;  
        default:
            return state;
    }
}