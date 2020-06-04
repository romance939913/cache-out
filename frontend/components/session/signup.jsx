import React from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

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
    this.props.signup(user);
    setTimeout(() => { this.props.clearSessionErrors() }, 3000);
  }

  render() {
    const errorsArr = [];
    this.props.errors.map((error, i) => {
      errorsArr.push(
      <p className="session-errors" key={`error-${i}`}>
        {error}
      </p>)
    });

    const responseGoogle = (response) => {
      this.setState({
        username: response.Tt.sW,
        email: response.Tt.Du,
        password: `google-${response.googleId}`
      })
    }
    // google - 108621945708507842730
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
          type="text"
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
          <div className="signup-submit-container">
            <GoogleLogin
              clientId="254946018512-0dqs14at73oms2h69u8ugpjoir67935g.apps.googleusercontent.com"
              buttonText="Use Google Credentials"
              className="google-signup-button"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <input
              type="submit"
              value="Get Started"
              className="signup-submit"
            />
          </div>
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