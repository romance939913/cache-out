import { fetchStockWeek,
        fetchStockDay, 
        fetchstockHistorical, 
        fetchNews } from "../util/graph_api_util"

export const RECEIVE_HISTORICAL = "RECEIVE_HISTORICAL";
export const RECEIVE_DAY = "RECEIVE_DAY";
export const RECEIVE_WEEK = "RECEIVE_WEEK";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

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

const receiveTheNews = news => ({
    type: RECEIVE_NEWS,
    news
})

export const receiveHistorical = (ticker) => dispatch => fetchstockHistorical(ticker)
    .then(prices => dispatch(receiveTheHistorical(prices)))

export const receiveDay = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDay(prices)))

export const receiveWeek = (ticker) => dispatch => fetchStockWeek(ticker)
    .then(prices => dispatch(receiveTheWeek(prices)))

export const receiveNews = () => dispatch => fetchNews()
    .then(news => dispatch(receiveTheNews(news)))
