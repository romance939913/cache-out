import { RECEIVE_WEEK, 
            RECEIVE_DAY, 
            RECEIVE_MONTH,
            RECEIVE_THREE_MONTHS,
            RECEIVE_YEAR,
            RECEIVE_FIVE_YEARS,
            CLEAR_GRAPH_PRICES, 
            RECEIVE_DAYS } from "../../actions/graph_actions";

export const graphPricesReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_DAY:
            nextState['Day'] = action.prices;
            return nextState;        
        case RECEIVE_DAYS:
            nextState[action.prices.ticker] = action.prices.prices;
            return nextState;
        case RECEIVE_WEEK:
            nextState['Week'] = action.prices;
            return nextState;
        case RECEIVE_MONTH:
            nextState['Month'] = action.prices;
            return nextState;
        case RECEIVE_THREE_MONTHS:
            nextState['ThreeMonths'] = action.prices;
            return nextState;
        case RECEIVE_YEAR:
            nextState['Year'] = action.prices;
            return nextState;
        case RECEIVE_FIVE_YEARS:
            nextState['FiveYears'] = action.prices;
            return nextState;
        case CLEAR_GRAPH_PRICES:
            return [];        
        default:
            return state;
    }
}

