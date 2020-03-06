import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root'
// import { signup, login } from "./util/session_api_util";
import configureStore from "./store/store";
import { fetchNYSE, fetchNasdaq, fetchIndexes, fetchStockDay, fetchstockHistorical, fetchProfile } from "./util/securities_api_util";


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
    
    window.fetchNasdaq = fetchNasdaq;
    window.fetchNYSE = fetchNYSE;
    window.fetchIndexes = fetchIndexes;
    window.fetchStockDay = fetchStockDay;
    window.fetchstockHistorical = fetchstockHistorical;
    window.fetchProfile = fetchProfile;
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});
