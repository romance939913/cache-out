import { fetchStockWeek,
        fetchStockDay, 
        fetchstockHistorical, 
        fetchNews, 
        fetchSnapshots} from "../util/graph_api_util"

export const RECEIVE_HISTORICAL = "RECEIVE_HISTORICAL";
export const RECEIVE_DAY = "RECEIVE_DAY";
export const RECEIVE_DAYS = "RECEIVE_DAYS";
export const RECEIVE_WEEK = "RECEIVE_WEEK";
export const CLEAR_GRAPH_PRICES = "CLEAR_GRAPH_PRICES";
export const RECEIVE_SNAPSHOTS = "RECEIVE_SNAPSHOTS";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

const receiveTheHistorical = (prices) => ({
    type: RECEIVE_HISTORICAL,
    prices
})

const receiveTheDay = prices => ({
    type: RECEIVE_DAY,
    prices
})

const receiveTheDays = prices => ({
    type: RECEIVE_DAYS,
    prices
})

const receiveTheWeek = prices => ({
    type: RECEIVE_WEEK,
    prices
})

const clearTheGraphPrices = () => ({
    type: CLEAR_GRAPH_PRICES,
})

const receiveTheSnapshots = snapshots => ({
    type: RECEIVE_SNAPSHOTS,
    snapshots
})

const receiveTheNews = news => ({
    type: RECEIVE_NEWS,
    news
})

export const receiveHistorical = (ticker) => dispatch => fetchstockHistorical(ticker)
    .then(prices => dispatch(receiveTheHistorical(prices)))

export const receiveDay = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDay(prices)))

export const receiveMultipleDays = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDays({ticker, prices})))

export const receiveWeek = (ticker) => dispatch => fetchStockWeek(ticker)
    .then(prices => dispatch(receiveTheWeek(prices)))

export const receiveNews = () => dispatch => fetchNews()
    .then(news => dispatch(receiveTheNews(news)))

export const receiveSnapshots = (userId) => dispatch => fetchSnapshots(userId)
    .then(snapshots => dispatch(receiveTheSnapshots(snapshots)))

export const clearGraphPrices = () => dispatch(clearTheGraphPrices())
