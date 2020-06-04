import React from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDemoSignin = this.handleDemoSignin.bind(this)
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value})
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
    this.props.signin(rand)
    setTimeout(() => {
      this.props.logoutUser();
    }, 3600000); 
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signin(user);
    setTimeout(() => { this.props.clearSessionErrors() }, 3000);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="session-errors" key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const errorsArr = [];
    this.props.errors.map((error, i) => {
      errorsArr.push(
      <li className="session-errors" key={`error-${i}`}>
        {error}
      </li>)
    })

    const responseGoogle = (response) => {
      const user = {
        username: response.Tt.sW,
        password: `google-${response.googleId}`
      }
      this.props.signin(user);
      setTimeout(() => { this.props.clearSessionErrors() }, 3000);
    }

    return(
      <div className="signin-container">
        <img className="image-signin-bg" src={window.signin_bg_pic} alt=""/>
        <div className="signin-form">
          <form className="signin-box" onSubmit={this.handleSubmit}>
            <h3 className="signin-welcome-header">Welcome to Cache Out</h3>
            <br/>
            <label className="signin-form-label">username
              <input 
                className="signin-input-field"
                type="text"
                value={this.state.username}
                onChange={this.update('username')}
              />
              <br/>
            </label>
            <label className="signin-form-label">Password
              <input 
                className="signin-input-field"
                type="text"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>
            <div className="signin-links-container">
              <Link to="/"><p className="signin-alt-links">Back to splash page</p></Link>
              <p onClick={this.handleDemoSignin} className="signin-alt-links">Demo User</p>
            </div>
            <ul className="signin-errors-arr">
              <p className="placeholder-yo">yo</p>{errorsArr}
            </ul>
            <div className="signin-submit-container">
              <input type="submit" value="Sign In" className="signin-submit"/>
              <div>
                <GoogleLogin
                  clientId="254946018512-0dqs14at73oms2h69u8ugpjoir67935g.apps.googleusercontent.com"
                  buttonText="Login with Google Credentials"
                  className="google-login-button"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default Signin;
