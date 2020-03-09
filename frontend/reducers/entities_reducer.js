import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { indexesReducer } from './securities/indexes_reducer';
import { profileReducer } from './securities/profile_show_reducer';
import { dayShowReducer } from './securities/day_show_reducer';
import { realTimePriceReducer } from './securities/realtime_price_reducer';
import { historicalShowReducer } from './securities/historical_show_reducer';
import { weekShowReducer } from './securities/week_show_reducer';
import { holdingsReducer } from './holdings_transactions/holdings_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    indexes: indexesReducer,
    profile: profileReducer,
    showDayPrices: dayShowReducer,
    showWeekPrices: weekShowReducer,    
    showHistoricalPrices: historicalShowReducer,
    price: realTimePriceReducer,
    holdings: holdingsReducer
});

export default entitiesReducer;