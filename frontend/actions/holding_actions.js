import { createNewHolding, 
        indexHoldings, 
        updateUserBuyingPower, 
        showHolding
    } from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const GET_HOLDINGS = "GET_HOLDINGS";
export const GET_HOLDING = "GET_HOLDING";
export const UPDATE_BUYING_POWER = "UPDATE_BUYING_POWER"
export const RECEIVE_HOLDING_ERRORS = "RECEIVE_HOLDING_ERRORS"

const receiveTheHolding = (holding) => ({
        type: RECEIVE_HOLDING,
        holding
});

const getTheHoldings = (holdings) => ({
        type: GET_HOLDINGS,
        holdings
});

const getTheHolding = (holding) => ({
        type: GET_HOLDING,
        holding
});

const updateTheUser = user => ({
    type: UPDATE_BUYING_POWER,
    user
});

const receiveErrors = (errorsArr) => ({
    type: RECEIVE_HOLDING_ERRORS,
    errorsArr
})

export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(holding => dispatch(receiveTheHolding(holding)), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const getHoldings = (holdings) => dispatch => indexHoldings(holdings)
    .then(res => dispatch(getTheHoldings(res)));

export const updateUser = (holding) => dispatch => updateUserBuyingPower(holding)
    .then(holding => dispatch(updateTheUser(holding)), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const getHolding = (holding) => dispatch => showHolding(holding)
    .then(holding => dispatch(getTheHolding(holding)))