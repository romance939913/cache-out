import { fetchIndexes,
    fetchNYSE,
    fetchNasdaq,
    fetchRealTimePrice,
    fetchProfile,
    fetchIndexPrices} from "../util/securities_api_util";

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_INDEXES = "RECEIVE_INDEXES";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_REALTIME = "RECEIVE_REALTIME";
export const RECEIVE_INDEX_PRICES = "RECEIVE_INDEX_PRICES";

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
});

const receiveTheIndexes = (indexes) => ({
    type: RECEIVE_INDEXES,
    indexes
});


const receiveTheProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});

const receiveTheRealTimePrice = price => ({
    type: RECEIVE_REALTIME,
    price
});

const receiveTheIndexPrices = prices => ({
    type: RECEIVE_INDEX_PRICES,
    prices
})

export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())));

export const receiveIndexes = () => dispatch => fetchIndexes()
    .then(indexes => dispatch(receiveTheIndexes(indexes)));

export const receiveProfile = (company) => dispatch => fetchProfile(company)
    .then(profile => dispatch(receiveTheProfile(profile)));

export const receiveRealTimePrice = (company) => dispatch => fetchRealTimePrice(company)
    .then(price => dispatch(receiveTheRealTimePrice(price)));

export const receiveIndexPrices = (index) => dispatch => fetchIndexPrices(index)
    .then(prices => dispatch(receiveTheIndexPrices(prices)))

// export const loginUser = (formUser) => dispatch => login(formUser)
//     .then(user => dispatch(receiveCurrentUser(user)), pojo => dispatch(receiveErrors(pojo.responseJSON)))

    