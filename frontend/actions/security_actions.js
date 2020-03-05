import { fetchIndexes, fetchNYSE, fetchNasdaq } from "../util/securities_api_util";

// export const RECEIVE_NYSE = "RECEIVE_NYSE";
// export const RECEIVE_NASDAQ = "RECEIVE_NASDAQ";
// export const RECEIVE_INDEXES = "RECEIVE_INDEXES";

export const RECEIVE_STOCKS = "RECEIVE_STOCKS"

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
})


export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())))