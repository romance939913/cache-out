import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { profileReducer } from './securities/profile_show_reducer';
import { realTimePriceReducer } from './securities/realtime_price_reducer';
import { graphPricesReducer } from './securities/graph_prices_reducer';
import { holdingReducer } from './securities/holding_reducer';
import { cashReducer } from './securities/cash_reducer';
import { newsReducer } from './securities/news_reducer';
import { graphSnapshotReducer } from './securities/graph_snapshot_reducer';
import { financialsReducer } from './securities/financials_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    profile: profileReducer,
    news: newsReducer,
    price: realTimePriceReducer,
    graphPrices: graphPricesReducer,
    snapshots: graphSnapshotReducer,
    holdings: holdingReducer,
    buyingPower: cashReducer,
    financials: financialsReducer,
});

export default entitiesReducer;