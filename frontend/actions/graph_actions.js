import { fetchStockDay, 
        fetchStockWeek,
        fetchStockMonth,
        fetchStockThreeMonths,
        fetchStockYear,
        fetchStockFiveYears, 
        fetchNews, 
        fetchSnapshots} from "../util/graph_api_util"

export const RECEIVE_DAY = "RECEIVE_DAY";
export const RECEIVE_DAYS = "RECEIVE_DAYS";
export const RECEIVE_WEEK = "RECEIVE_WEEK";
export const RECEIVE_MONTH = "RECEIVE_MONTH";
export const RECEIVE_THREE_MONTHS = "RECEIVE_THREE_MONTHS";
export const RECEIVE_YEAR = "RECEIVE_YEAR";
export const RECEIVE_FIVE_YEARS = "RECEIVE_FIVE_YEARS";
export const CLEAR_GRAPH_PRICES = "CLEAR_GRAPH_PRICES";
export const RECEIVE_SNAPSHOTS = "RECEIVE_SNAPSHOTS";
export const RECEIVE_NEWS = "RECEIVE_NEWS";

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

const receiveTheMonth = prices => ({
    type: RECEIVE_MONTH,
    prices
})

const receiveTheThreeMonths = prices => ({
    type: RECEIVE_THREE_MONTHS,
    prices
})

const receiveTheYear = prices => ({
    type: RECEIVE_YEAR,
    prices
})

const receiveTheFiveYears = prices => ({
    type: RECEIVE_FIVE_YEARS,
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

export const receiveDay = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDay(prices)))

export const receiveMultipleDays = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDays({ticker, prices})))

export const receiveWeek = (ticker) => dispatch => fetchStockWeek(ticker)
    .then(prices => dispatch(receiveTheWeek(prices)))

export const receiveMonth = (ticker) => dispatch => fetchStockMonth(ticker)
    .then(prices => dispatch(receiveTheMonth(prices)))

export const receiveThreeMonths = (ticker) => dispatch => fetchStockThreeMonths(ticker)
    .then(prices => dispatch(receiveTheThreeMonths(prices)))

export const receiveYear = (ticker) => dispatch => fetchStockYear(ticker)
    .then(prices => dispatch(receiveTheYear(prices)))

export const receiveFiveYears = (ticker) => dispatch => fetchStockFiveYears(ticker)
    .then(prices => dispatch(receiveTheFiveYears(prices)))

export const receiveNews = () => dispatch => fetchNews()
    .then(news => dispatch(receiveTheNews(news)))

export const receiveSnapshots = (userId) => dispatch => fetchSnapshots(userId)
    .then(snapshots => dispatch(receiveTheSnapshots(snapshots)))

export const clearGraphPrices = () => dispatch(clearTheGraphPrices())
