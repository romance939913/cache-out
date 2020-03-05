import { fetchIndexes, fetchNYSE, fetchNasdaq } from "../util/securities_api_util";

export const RECEIVE_STOCKS = "RECEIVE_STOCKS"
export const RECEIVE_INDEXES = "RECEIVE_INDEXES"

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
})

const receiveTheIndexes = (indexes) => ({
    type: RECEIVE_INDEXES,
    indexes
})


export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())))

export const receiveIndexes = () => dispatch => fetchIndexes()
    .then(indexes => dispatch(receiveTheIndexes(indexes)))