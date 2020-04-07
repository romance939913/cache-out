import { combineReducers } from "redux";
import { sessionReducer } from "./session_reducer";
import entitiesReducer from "./entities_reducer";
import flashReducer from "./flash_reducer";


const rootReducer = combineReducers({
    entities: entitiesReducer,
    session: sessionReducer,
    errors: flashReducer
});

export default rootReducer;