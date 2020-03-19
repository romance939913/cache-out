import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root'
// import { signup, login } from "./util/session_api_util";
import configureStore from "./store/store";
import { fetchNYSE, fetchNasdaq, fetchIndexes, fetchProfile } from "./util/securities_api_util";
import { fetchstockHistorical, fetchStockWeek, fetchStockDay } from "./util/graph_api_util";
import { receiveHistorical } from "./actions/graph_actions";


document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore();
    }
    
    // testing start
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // testing end
    window.receiveHistorical = receiveHistorical
    window.fetchstockHistorical = fetchstockHistorical;
    window.fetchStockWeek = fetchStockWeek;
    window.fetchStockDay = fetchStockDay;
    window.fetchNasdaq = fetchNasdaq;
    window.fetchNYSE = fetchNYSE;
    window.fetchIndexes = fetchIndexes;
    window.fetchProfile = fetchProfile;
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});
