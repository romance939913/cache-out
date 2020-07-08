import {
    fetchRealTimePrice,
    fetchProfile,
    fetchFinancials,
    fetchProfileFMP,
    fetchNYSE,
    fetchNasdaq } from "../util/securities_api_util";

export const RECEIVE_FINANCIALS = "RECEIVE_FINANCIALS";    
export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_PROFILE = "RECEIVE_PROFILE";
export const RECEIVE_REALTIME = "RECEIVE_REALTIME";
export const CLEAR_REALTIME = "CLEAR_REALTIME";

const receiveTheStocks = (stocks) => ({
    type: RECEIVE_STOCKS,
    stocks
});

const receiveTheFinancials = (financials) => ({
    type: RECEIVE_FINANCIALS,
    financials
})

const receiveTheProfile = profile => ({
    type: RECEIVE_PROFILE,
    profile
});

const receiveTheRealTimePrice = (price, symbol) => ({
    type: RECEIVE_REALTIME,
    price,
    symbol
});

const clearTheRealTimePrice = () => ({
    type: CLEAR_REALTIME
});

export const receiveStocks = () => dispatch => Promise.all([fetchNYSE(), fetchNasdaq()])
    .then(stocks => dispatch(receiveTheStocks(stocks.flat())));

export const receiveProfile = (company) => dispatch => fetchProfile(company)
    .then(profile => dispatch(receiveTheProfile(profile)));

export const receiveRealTimePrice = (company) => dispatch => fetchRealTimePrice(company)
    .then(price => dispatch(receiveTheRealTimePrice(price, company)));

export const receiveFinancials = (ticker) => dispatch => Promise.all([fetchFinancials(ticker), fetchProfileFMP(ticker)])
    .then(financials => dispatch(receiveTheFinancials(financials)))

export const clearRealTimePrice = () => dispatch(clearTheRealTimePrice())
    