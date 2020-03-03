import React from "react";
import ReactDOM from "react-dom";
import Root from './components/root'
// import { signup, login } from "./util/session_api_util";
import configureStore from "./store/store";

document.addEventListener("DOMContentLoaded", () => {
    const store = configureStore();

    // testing start
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // testing end

    // window.signup = signup;
    // window.login = login;
    const root = document.getElementById("root");
    ReactDOM.render(<Root store={store}/>, root);
});
