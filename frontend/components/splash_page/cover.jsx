import React from 'react';
import { Link } from 'react-router-dom'

class SplashCover extends React.Component {
  constructor(props) {
    super(props);
    this.handleDemoSignin = this.handleDemoSignin.bind(this);
    this.handleEmailWaitlist = this.handleEmailWaitlist.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      email: ''
    }
  }

  handleDemoSignin() {
    let a = { username: 'demo', password: 'password' };
    let b = { username: 'demo2', password: 'password' };
    let c = { username: 'demo3', password: 'password' };
    let d = { username: 'demo4', password: 'password' };
    let e = { username: 'demo5', password: 'password' };
    let array = [a, b, c, d, e];
    let rand = array[Math.floor(Math.random() * array.length)];
    this.props.login(rand)
    this.props.signin(rand)
    setTimeout(() => {
      this.props.logoutUser();
    }, 3600000); 
  }

  update(field) {
    return e => {
      this.setState({
        [field]: e.currentTarget.value,
      })
    }
  }

  handleEmailWaitlist() {
    let button = document.getElementById("fractional-shares-email-submit");
    button.innerText = "You're in!";
    setTimeout(() => {
      button.innerText = "Get early access"
    }, 2000)
    this.setState({
      email: ''
    })
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
          <p className="splash-content-text-top">Ever wish you had a spare million dollars lying around? With Cache Out you do!</p>
          <p className="splash-content-text">Build the portfolio of your dreams and monitor its performance up to the minute</p>
        </div>
        <div className="fractional-shares-div">
          <div className="fractional-shares-content">
            <div className="fractional-header-div">
              <h1 className="fractional-shares-header">Introducing Fractional Shares</h1>
              <p className="fractional-shares-caption">Invest in thousands of stocks with as little as $1</p>
            </div>
            <div className="fractional-content-div">
              <div className="fractional-content-card">
                <h3 className="fractional-content-header">Invest Any Amount</h3>
                <p className="fractional-shares-p">Choose how much you want to invest and we'll convert from dollars to parts of a whole share</p>
              </div>
              <div className="fractional-content-card">
                <h3 className="fractional-content-header">Build a Balanced Portfolio</h3>
                <p className="fractional-shares-p">Customize your portfolio with pieces of different companies and funds to help reduce risk.</p>
              </div>
              <div className="fractional-content-card">
                <h3 className="fractional-content-header">Trade in Real Time</h3>
                <p className="fractional-shares-p">Investing in fractional shares is real-time and, as always, commission-free.</p>
              </div>
            </div>
            <div className="fractional-input-div">
              <input 
                placeholder="enter your email" 
                type="text"
                value={this.state.email}
                onChange={this.update("email")}
                className="fractional-shares-input"
              />
              <p 
                id="fractional-shares-email-submit"
                className="splash-navigation-sign-up"
                onClick={this.handleEmailWaitlist}
              >Get Early Access</p>
            </div>
          </div>
          <img 
            src={window.partial_shares_pic} 
            alt=""
            className="fractional-shares-img"
          />
        </div>
      </div>
    )
  }
}

export default SplashCover;
