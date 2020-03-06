import { fetchIndexes,
    fetchNYSE,
    fetchNasdaq,
    fetchStockDay,
    fetchstockHistorical, 
    fetchProfile} from "../util/securities_api_util";

export const RECEIVE_STOCKS = "RECEIVE_STOCKS"
export const RECEIVE_INDEXES = "RECEIVE_INDEXES"
export const RECEIVE_HISTORICAL = "RECEIVE_HISTORICAL"
export const RECEIVE_DAY = "RECEIVE_DAY"
export const RECEIVE_PROFILE = "RECEIVE_PROFILE"

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
})

const receiveTheIndexes = (indexes) => ({
    type: RECEIVE_INDEXES,
    indexes
})

const receiveTheHistorical = (prices) => ({
    type: RECEIVE_HISTORICAL,
    prices
})

const receiveTheDay = prices => ({
    type: RECEIVE_DAY,
    prices
})

const receiveTheProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
})

export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())))

export const receiveIndexes = () => dispatch => fetchIndexes()
    .then(indexes => dispatch(receiveTheIndexes(indexes)))

export const receiveHistorical = (ticker) => dispatch => fetchstockHistorical(ticker)
    .then(prices => dispatch(receiveTheHistorical(prices)))

export const receiveDay = (ticker) => dispatch => fetchStockDay(ticker)
    .then(prices => dispatch(receiveTheDay(prices)))

export const receiveProfile = (company) => dispatch => fetchProfile(company)
    .then(profile => dispatch(receiveTheProfile(profile)))

    