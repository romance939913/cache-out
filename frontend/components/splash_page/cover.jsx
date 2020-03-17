import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <div className="splash-jumbotron">
      <div className="splash-jumbotron-mission">
        <p className="splash-jumbotron-header">It's Time to Do Money</p>
        <p className="splash-jumbotron-text">Stock Overflow, a pioneer of commission-free investing, gives you more ways to make your money work harder</p>
        <Link className="splash-jumbotron-signup" to="/signup">Sign up</Link>
      </div>
      <div className="gif-holder">
        <video autoPlay loop muted preload="auto" className="video-cont">
          <source 
            className="gif-iphone" 
            src={window.iphone_vid}
            type="video/mp4"
          />
        </video>
        <div className="iphone-img-holder">
          <img 
            className="img-iphone" 
            src={window.iphone_splash_pic}
            role="presentation" 
            draggable="false"
          />
        </div>
      </div>
    </div>
    <div className="splash-content">
      <h2 className="splash-content-header">Break Free from Commission Fees</h2>
      <p className="splash-content-text">Make unlimited commission-free trades in stocks, funds, and options with 
        Robinhood Financial. The same goes for buying and selling cryptocurrencies 
        with Robinhood Crypto. Zero commission fees.</p>
    </div>
  </div>
);
