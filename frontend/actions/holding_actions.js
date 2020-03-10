import { createNewHolding, 
        showHolding, 
        updateUserBuyingPower 
    } from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const GET_HOLDING = "GET_HOLDING";
export const UPDATE_BUYING_POWER = "UPDATE_BUYING_POWER"

const receiveTheHolding = (holding) => ({
    type: RECEIVE_HOLDING,
    holding
})

const getTheHolding = holding => ({
    type: GET_HOLDING,
    holding
})

const updateTheUser = user => ({
    type: UPDATE_BUYING_POWER,
    user
})

export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(holding => dispatch(receiveTheHolding(holding)))

export const getHolding = (holding) => dispatch => showHolding(holding)
    .then(retrievedHolding => dispatch(getTheHolding(retrievedHolding)))

export const updateUser = (holding) => dispatch => updateUserBuyingPower(holding)
    .then(holding => dispatch(updateTheUser(holding)))
