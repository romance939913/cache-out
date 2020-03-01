import React from 'react';

export default () => (
    <div className="splash-navigation-bar">
        <div className="splash-navigation-bar-left-side">
            <a href="">Robinhood</a>
            <ul className="button-ul-nav">
                <li>
                    <a href="">Products</a>
                </li>
                <li>
                    <a href="">Learn</a>
                </li>
                <li>
                    <a href="">Support</a>
                </li>
            </ul>
        </div>
        <div className="splash-navigation-bar-left-side">
            <button className="splash-navigation-sign-in">Sign in</button>
            <button className="splash-navigation-sign-up">Sign Up</button>
        </div>
    </div>
);