import { fetchIndexes,
    fetchNYSE,
    fetchNasdaq,
    fetchRealTimePrice,
    fetchProfile} from "../util/securities_api_util";
import { fetchstockHistorical, 
    fetchStockDay,
    fetchStockWeek} from "../util/graph_api_util";


export const RECEIVE_STOCKS = "RECEIVE_STOCKS"
export const RECEIVE_INDEXES = "RECEIVE_INDEXES"
export const RECEIVE_PROFILE = "RECEIVE_PROFILE"
export const RECEIVE_REALTIME = "RECEIVE_REALTIME"

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

const receiveTheRealTimePrice = price => ({
    type: RECEIVE_REALTIME,
    price
})

export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())))

export const receiveIndexes = () => dispatch => fetchIndexes()
    .then(indexes => dispatch(receiveTheIndexes(indexes)))

export const receiveProfile = (company) => dispatch => fetchProfile(company)
    .then(profile => dispatch(receiveTheProfile(profile)))

export const receiveRealTimePrice = (company) => dispatch => fetchRealTimePrice(company)
    .then(price => dispatch(receiveTheRealTimePrice(price)))

    