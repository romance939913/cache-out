import { RECEIVE_WEEK, 
            RECEIVE_DAY, 
            RECEIVE_HISTORICAL,
            CLEAR_GRAPH_PRICES } from "../../actions/graph_actions";

export const graphPricesReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case RECEIVE_DAY:
            nextState['Day'] = action.prices;
            return nextState;        
        case RECEIVE_WEEK:
            nextState['Week'] = action.prices;
            return nextState;
        case RECEIVE_HISTORICAL:
            nextState['Historical'] = action.prices.historical;
            return nextState;
        case CLEAR_GRAPH_PRICES:
            return [];        
        default:
            return state;
    }
}

