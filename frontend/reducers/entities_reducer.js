import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { indexesReducer } from './securities/indexes_reducer';
import { profileReducer } from './securities/profile_show_reducer';
import { realTimePriceReducer } from './securities/realtime_price_reducer';
import { graphPricesReducer } from './securities/graph_prices_reducer';
import { cashReducer } from './securities/holdings_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    indexes: indexesReducer,
    profile: profileReducer,
    price: realTimePriceReducer,
    graphPrices: graphPricesReducer,
    cash: cashReducer
});

export default entitiesReducer;