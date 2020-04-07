import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./flash/session_errors_reducer";
import { transactionErrorsReducer } from "./flash/transaction_flash_reducer";

const flashReducer = combineReducers({
    session: sessionErrorsReducer,
    transaction: transactionErrorsReducer
})

export default flashReducer;