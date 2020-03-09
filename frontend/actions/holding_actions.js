import { createNewHolding } from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";

const receiveTheHolding = (holding) => ({
    type: RECEIVE_HOLDING,
    holding
})

export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(newHolding => dispatch(receiveTheHolding(newHolding)))

