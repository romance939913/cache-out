import {
    CLEAR_GRAPH_PRICES,
    RECEIVE_DAYS
} from "../../actions/graph_actions";

export const portfolioGraphPricesReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_DAYS:
            nextState[action.prices.ticker] = action.prices.prices;
            return nextState;
        default:
            return state;
    }
}