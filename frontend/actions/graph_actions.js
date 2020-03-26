import { fetchStockWeek, fetchStockDay, fetchstockHistorical } from "../util/graph_api_util"

export const RECEIVE_HISTORICAL = "RECEIVE_HISTORICAL"
export const RECEIVE_DAY = "RECEIVE_DAY"
export const RECEIVE_WEEK = "RECEIVE_WEEK"


const receiveTheHistorical = (prices) => ({
    type: RECEIVE_HISTORICAL,
    prices
})

const receiveTheDay = prices => ({
    type: RECEIVE_DAY,
    prices
})

const receiveTheWeek = prices => ({
    type: RECEIVE_WEEK,
    prices
})

export const receiveHistorical = (ticker) => dispatch => fetchstockHistorical(ticker)
    .then(prices => dispatch(receiveTheHistorical(prices)))

export const receiveDay = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDay(prices)))

export const receiveWeek = (ticker) => dispatch => fetchStockWeek(ticker)
    .then(prices => dispatch(receiveTheWeek(prices)))