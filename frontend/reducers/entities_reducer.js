import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { indexesReducer } from './securities/indexes_reducer';
import { profileReducer } from './securities/profile_show_reducer';
import { realTimePriceReducer } from './securities/realtime_price_reducer';
import { graphPricesReducer } from './securities/graph_prices_reducer';
import { holdingReducer } from './securities/holding_reducer';
import { indexPricesReducer } from './securities/index_prices_reducer';
import { cashReducer } from './securities/cash_reducer';
import { newsReducer } from './securities/news_reducer';
import { graphSnapshotReducer } from './securities/graph_snapshot_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    indexes: indexesReducer,
    profile: profileReducer,
    news: newsReducer,
    price: realTimePriceReducer,
    graphPrices: graphPricesReducer,
    snapshots: graphSnapshotReducer,
    holdings: holdingReducer,
    indexPrices: indexPricesReducer,
    buyingPower: cashReducer
});

export default entitiesReducer;