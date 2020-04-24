import React from 'react';
import { Link } from 'react-router-dom'

class SplashCover extends React.Component {
  constructor(props) {
    super(props);
    this.handleDemoSignin = this.handleDemoSignin.bind(this);
  }

  handleDemoSignin() {
    let a = { username: 'demo', password: 'password' };
    let b = { username: 'demo2', password: 'password' };
    let c = { username: 'demo3', password: 'password' };
    let d = { username: 'demo4', password: 'password' };
    let e = { username: 'demo5', password: 'password' };
    let f = { username: 'demo6', password: 'password' };
    let g = { username: 'demo7', password: 'password' };
    let h = { username: 'demo8', password: 'password' };
    let i = { username: 'demo9', password: 'password' };
    let j = { username: 'demo10', password: 'password' };
    let array = [a, b, c, d, e, f, g, h, i, j];
    let rand = array[Math.floor(Math.random() * array.length)];
    this.props.login(rand)
    this.props.signin(rand)
    setTimeout(() => {
      this.props.logoutUser();
    }, 3600000); 
  }

  render() {
    return(
      <div>
        <div className="splash-jumbotron">
          <div className="splash-jumbotron-mission">
            <p className="splash-jumbotron-header">It's Time to Do Money</p>
            <p className="splash-jumbotron-text">Cache Out lets you practice investing in the stock market, consequence free. Try it out here!</p>
            <p className="splash-jumbotron-demo " onClick={this.handleDemoSignin}>Demo User</p>
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
          <h2 className="splash-content-header">Sharpen your skills and track your portfolio</h2>
          <p className="splash-content-text">Ever wish you had a spare million dollars lying around? With Cache Out you do! Build the portfolio of your dreams
          and monitor its performance up to the minute.</p>
        </div>
      </div>
    )
  }
}

export default SplashCover;
