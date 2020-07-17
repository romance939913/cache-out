import React from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSignin = this.handleDemoSignin.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.responseErrorGoogle = this.responseErrorGoogle.bind(this);
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value})
    }
  }

  handleDemoSignin() {
    let a = { username: 'demo', password: 'password' };
    this.props.signin(a)
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signin(user);
    setTimeout(() => { this.props.clearSessionErrors() }, 3000);
  }

  responseGoogle(response) {
    const user = {
      username: response.profileObj.givenName,
      password: `g$${response.profileObj.googleId}`
    }
    this.props.signin(user);
    setTimeout(() => { this.props.clearSessionErrors() }, 3000);
  }

  responseErrorGoogle(response) {
    console.log("google response error");
    console.log(response);
  }

  responseFacebook(response) {
    let firstName = response.name.split(" ")[0];
    let user = {
      username: firstName,
      password: `f$${response.id}`
    };
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

    return(
      <div className="signin-container">
        <img className="image-signin-bg" src={window.signin_bg_pic} alt=""/>
        <div className="signin-form">
          <div className="signin-box" >
            <form onSubmit={this.handleSubmit}>
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
                  type="password"
                  value={this.state.password}
                  onChange={this.update('password')}
                />
              </label>
              <div className="signin-links-container">
                <Link to="/"><p className="signin-alt-links">Back to splash page</p></Link>
                <p onClick={this.handleDemoSignin} className="signin-alt-links">Demo User</p>
              </div>
              <div className="signin-submit-container">
                <input type="submit" value="Sign In" className="signin-submit"/>
              </div>
            </form>
            <div className="oauth-signin-container">
              <GoogleLogin
                clientId="254946018512-0dqs14at73oms2h69u8ugpjoir67935g.apps.googleusercontent.com"
                buttonText="Login with Google Credentials"
                className="google-login-button oauth-signin"
                onSuccess={this.responseGoogle}
                onFailure={this.responseErrorGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="oauth-signin google-signin"
                  >Google Credentials</button>
                )}
              />
              <FacebookLogin
                appId="310290627021497"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
                render={renderProps => (
                  <button
                    className="oauth-signin facebook-signin"
                    onClick={renderProps.onClick}
                  >Facebook Credentials</button>
                )}
              />
            </div>
            <ul className="signin-errors-arr">
              <p className="placeholder-yo">yo</p>{errorsArr}
            </ul>
          </div>
        </div>
      </div>
    )
  }
};

export default Signin;
