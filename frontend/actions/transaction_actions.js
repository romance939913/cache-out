import {
    createNewTransaction,
    indexTransactions,
    showTransactions
} from "../util/transaction_api_util";

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const GET_TRANSACTIONS = "GET_TRANSACTIONS";

const receiveTheTransaction = (transaction) => ({
    type: RECEIVE_TRANSACTION,
    transaction
});

const getTheTransactions = (transactions) => ({
    type: GET_TRANSACTIONS,
    transactions
});


export const receiveTransaction = (transaction) => dispatch => createNewTransaction(transaction)
    .then(res => dispatch(receiveTheTransaction(res)))

export const getAllTransactions = (creds) => dispatch => indexTransactions(creds)
    .then(res => dispatch(getTheTransactions(res)));

export const getTransactions = (creds) => dispatch => showTransactions(creds)
    .then(res => dispatch(getTheTransactions(res)));
