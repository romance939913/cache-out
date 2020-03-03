import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
    <div className="splash-cover-jumbotron">
        <div className="splash-cover-jumbotron-left">
            <p className="splash-cover-jumbotron-header">It's Time to Do Money</p>
            <p className="splash-cover-jumbotron-text">Robinhood, a pioneer of commission-free investing, gives you more ways to make your money work harder</p>
            <Link className="splash-cover-jumbotron-signup">Sign up</Link>
        </div>
        <div>
            <img src="app/assets/images/300ce1bbd5554382eab71ad16dde89b0-1x.png" alt=""/>
        </div>
    </div>
);
