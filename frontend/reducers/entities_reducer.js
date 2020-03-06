import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { indexesReducer } from './securities/indexes_reducer';
import { profileReducer } from './securities/profile_show_reducer';
import { dayShowReducer } from './securities/day_show_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    indexes: indexesReducer,
    profile: profileReducer,
    showDayPrices: dayShowReducer
});

export default entitiesReducer;