import { createNewHolding, 
        indexHoldings, 
        updateUserBuyingPower 
    } from "../util/holding_api_util";

export const RECEIVE_HOLDING = "RECEIVE_HOLDING";
export const GET_HOLDINGS = "GET_HOLDING";
export const UPDATE_BUYING_POWER = "UPDATE_BUYING_POWER"

const receiveTheHolding = (holding) => {
    debugger
    return {
        type: RECEIVE_HOLDING,
        holding
    };
};

const getTheHoldings = (holdings) => {
    // debugger
    return {
        type: GET_HOLDINGS,
        holdings
    }
};

const updateTheUser = user => ({
    type: UPDATE_BUYING_POWER,
    user
});

export const receiveHolding = (holding) => dispatch => createNewHolding(holding)
    .then(holding => dispatch(receiveTheHolding(holding)));

export const getHoldings = (holdings) => dispatch => indexHoldings(holdings)
    .then(res => dispatch(getTheHoldings(res)));

export const updateUser = (holding) => dispatch => updateUserBuyingPower(holding)
    .then(holding => dispatch(updateTheUser(holding)));
