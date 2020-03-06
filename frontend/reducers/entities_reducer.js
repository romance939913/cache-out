import { combineReducers } from 'redux';
import { usersReducer } from './users_reducer';
import { securitiesReducer } from './securities/securities_reducer';
import { indexesReducer } from './securities/indexes_reducer';


const entitiesReducer = combineReducers({
    users: usersReducer,
    stocks: securitiesReducer,
    indexes: indexesReducer
});

export default entitiesReducer;