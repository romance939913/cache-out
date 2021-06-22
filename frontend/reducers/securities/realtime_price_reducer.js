import { RECEIVE_REALTIME,
    CLEAR_REALTIME,
    RECEIVE_REALTIMES } from "../../actions/security_actions";

export const realTimePriceReducer = (state = [], action) => {
    Object.freeze(state);
    let pojo = {};
    switch (action.type) {
        case CLEAR_REALTIME:
            return [];
        case RECEIVE_REALTIME:
            pojo[action.symbol] = action.price[0].price;
            return pojo;
        case RECEIVE_REALTIMES:
            action.prices.forEach(ele => {
                pojo[ele.symbol] = ele.price;
            })
            return pojo;
        default:
            return state;
    }
}