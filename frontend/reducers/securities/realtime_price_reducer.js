import { RECEIVE_REALTIME,
    CLEAR_REALTIME,
    RECEIVE_REALTIMES } from "../../actions/security_actions";

export const realTimePriceReducer = (state = [], action) => {
    Object.freeze(state);
    let nextState = Object.assign({}, state)
    switch (action.type) {
        case CLEAR_REALTIME:
            return [];
        case RECEIVE_REALTIME:
            nextState[action.symbol] = action.price[0].price;
            return nextState;
        case RECEIVE_REALTIMES:
            let pojo = {};
            action.prices.forEach(ele => {
                pojo[ele.symbol] = ele.price;
            })
            return pojo;
        default:
            return state;
    }
}