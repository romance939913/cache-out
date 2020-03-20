import { combineReducers } from "redux";
import { sessionErrorsReducer } from "./errors/session_errors_reducer";
import { transactionErrorsReducer } from "./errors/transaction_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    transaction: transactionErrorsReducer
})

export default errorsReducer;