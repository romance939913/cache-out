import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <div>
    <div className="splash-cover-jumbotron">
      <div className="splash-cover-jumbotron-left">
        <p className="splash-cover-jumbotron-header">It's Time to Do Money</p>
        <p className="splash-cover-jumbotron-text">Stock Overflow, a pioneer of commission-free investing, gives you more ways to make your money work harder</p>
        <Link className="splash-cover-jumbotron-signup">Sign up</Link>
      </div>
      <div className="gif-holder">
        <video autoPlay loop muted preload="auto" className="video-cont">
          <source 
            className="gif-iphone" 
            src="assets/iphone.mp4" 
            type="video/mp4"
          />
        </video>
        <div className="iphone-img-holder">
          <img 
            className="img-iphone" 
            src="assets/iphone_splash.png" 
            role="presentation" 
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
);
