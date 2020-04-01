import { createNewHolding, 
        indexHoldings, 
        updateUserBuyingPower, 
        showHolding,
        showUser
} from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const GET_USER = "GET_USER";
export const GET_HOLDINGS = "GET_HOLDINGS";
export const GET_HOLDING = "GET_HOLDING";
export const UPDATE_BUYING_POWER = "UPDATE_BUYING_POWER"
export const RECEIVE_HOLDING_ERRORS = "RECEIVE_HOLDING_ERRORS"
export const CLEAR_HOLDING_ERRORS = "CLEAR_HOLDING_ERRORS"

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

const getTheUser = user => ({
    type: GET_USER,
    user
})

const receiveErrors = (errorsArr) => ({
    type: RECEIVE_HOLDING_ERRORS,
    errorsArr
})

const clearTheErrors = () => ({
    type: CLEAR_HOLDING_ERRORS,
})

export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(holding => dispatch(receiveTheHolding(holding)), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const getHoldings = (holdings) => dispatch => indexHoldings(holdings)
    .then(res => dispatch(getTheHoldings(res)));

export const updateUser = (holding) => dispatch => updateUserBuyingPower(holding)
    .then(holding => dispatch(updateTheUser(holding)), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const getHolding = (holding) => dispatch => showHolding(holding)
    .then(holding => dispatch(getTheHolding(holding)))

export const getUserBP = (user) => dispatch => showUser(user)
    .then(user => dispatch(getTheUser(user)))

export const clearErrors = () => dispatch(clearTheErrors())