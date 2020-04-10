import { RECEIVE_HISTORICAL, 
            RECEIVE_WEEK, 
            RECEIVE_DAY, 
            CLEAR_GRAPH_PRICES, 
            RECEIVE_DAYS} from "../../actions/graph_actions";

export const graphPricesReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_HISTORICAL:
            return action.prices.historical;
        case RECEIVE_WEEK:
            return action.prices;
        case RECEIVE_DAY:
            return action.prices;        
        case RECEIVE_DAYS:
            nextState[action.prices.ticker] = action.prices.prices;
            return nextState;
        case CLEAR_GRAPH_PRICES:
            return [];        
        default:
            return state;
    }
}

