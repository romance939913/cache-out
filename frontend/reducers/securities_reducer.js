import { RECEIVE_STOCKS } from "../actions/security_actions";

export const securitiesReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_STOCKS:
            return Object.assign({}, { : action.stocks })
            // nextState[nasdaq] = action.stocks;  
        // case RECEIVE_INDEXES:
        //     Object.assign({}, { indexes: action.indexes })
        //     nextState[indexes] = action.indexes;
        default:
            return state;
    }
}