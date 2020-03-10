import { createNewHolding, showHolding } from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const GET_HOLDING = "GET_HOLDING";

const receiveTheHolding = (holding) => ({
    type: RECEIVE_HOLDING,
    holding

})

const getTheHolding = holding => ({
    type: GET_HOLDING,
    holding
})



export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(newHolding => dispatch(receiveTheHolding(newHolding)))

export const getHolding = (holding) => dispatch => showHolding(holding)
    .then(retrievedHolding => dispatch(getTheHolding(retrievedHolding)))
