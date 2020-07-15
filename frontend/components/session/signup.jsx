import React from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        email: '',
        password: '',
        buying_power: ''
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
    this.props.signup(user);
    setTimeout(() => { this.props.clearSessionErrors() }, 3000);
  }

  responseGoogle(response) {
    this.setState({
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: `g$${response.profileObj.googleId}`
    })
  }

  responseFacebook(response) {
    let firstName = response.name.split(" ")[0];
    this.setState({
      username: firstName,
      email: response.email,
      password: `f$${response.id}`
    })
  }

  responseErrorGoogle(response) {
    console.log('google signup error');
    console.log(response);
  }

  render() {
    const errorsArr = [];
    this.props.errors.map((error, i) => {
      errorsArr.push(
      <p className="session-errors" key={`error-${i}`}>
        {error}
      </p>)
    });

    return(
      <div className="signup-page-body">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="money-move">
            <img className="sign-up-logo" src={window.logo_pic} alt=""/>
            <h3>Make your Money Move</h3>
          </div>
          <p className="signup-description">Cache Out lets you practice investing with all the companies you know and love.</p>
          <input 
          type="text"
          placeholder="username"
          className="signup-input-field"
          value={this.state.username}
          onChange={this.update('username')}
          />
          <input 
          type="text"
          placeholder="email address"
          className="signup-input-field"
          value={this.state.email}
          onChange={this.update('email')}
          />
          <input 
          type="password"
          placeholder="password (min. 6 characters)"
          className="signup-input-field"
          value={this.state.password}
          onChange={this.update('password')}
          />
          <input 
          type="number"
          placeholder="Initial buying power (up to ten million)"
          min="0"
          max="10000000"
          className="quantity-chooser signup-input-field"
          onChange={this.update('buying_power')}
          />
          <div className="oauth-signup-container">
            <GoogleLogin
              clientId="254946018512-0dqs14at73oms2h69u8ugpjoir67935g.apps.googleusercontent.com"
              buttonText="Use Google Credentials"
              className="google-signup-button"
              onSuccess={this.responseGoogle}
              onFailure={this.responseErrorGoogle}
              cookiePolicy={'single_host_origin'}
              render={renderProps => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  className="oauth-signup google-signup"
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
                  className="oauth-signup facebook-signup"
                  onClick={renderProps.onClick}
                >Facebook Credentials</button>
              )}
            />
          </div>
          <input
            type="submit"
            value="Get Started"
            className="signup-submit"
          />
          <div className="signup-alternatives">
            <p className="already-a-user" onClick={this.handleDemoSignin}>Demo User</p>
            <Link to="/signin"><p className="already-a-user">Already a user? Sign in here</p></Link>
          </div>
          <div className="signin-errors-arr">
            <p className="placeholder-yo">yo</p>
            {errorsArr}
          </div>
        </form>

      </div>
    )
  }
};

export default Signup;