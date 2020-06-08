import { RECEIVE_ADVANCED_STATS } from "../../actions/security_actions";

export const advancedStatsReducer = (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ADVANCED_STATS:
      return action.stats;
    default:
      return state;
  }
}