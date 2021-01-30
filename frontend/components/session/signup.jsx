import React from 'react';
import { useReducer } from 'react';
import {Link} from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { connect } from 'react-redux';
import { signupUser, loginUser, clearSessionErrors, logoutUser } from '../../actions/session_actions';

function Signup(props) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { username: '', email: '', password: '', buying_power: '' });

  function handleInput(event) {
    const name = event.target.name;
    const newValue = event.target.value;
    setUserInput({ [name]: newValue });
  }

  function handleDemoSignin() {
    let a = { username: 'demo', password: 'password' };
    props.signin(a)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.signup(Object.assign({}, userInput));
    setTimeout(() => { props.clearSessionErrors() }, 3000);
  }

  function responseGoogle(response) {
    let user = {
      username: response.profileObj.givenName,
      email: response.profileObj.email,
      password: `g$${response.profileObj.googleId}`,
      buying_power: 1000000
    };
    props.signup(user);
    setTimeout(() => { props.clearSessionErrors() }, 3000);

  }

  function responseFacebook(response) {
    let firstName = response.name.split(" ")[0];
    let user = {
      username: firstName,
      email: response.email,
      password: `f$${response.id}`,
      buying_power: 1000000
    };
    props.signup(user);
    setTimeout(() => { props.clearSessionErrors() }, 3000);

  }

  function responseErrorGoogle(response) {
    console.log('google signup error');
    console.log(response);
  }

  const errorsArr = [];
  props.errors.map((error, i) => {
    errorsArr.push(
    <p className="session-errors" key={`error-${i}`}>
      {error}
    </p>)
  });

  return(
    <div className="signup-page-body">
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="money-move">
            <img className="sign-up-logo" src={window.logo_pic} alt=""/>
            <h3>Make your Money Move</h3>
          </div>
          <p className="signup-description">Cache Out lets you practice investing with all the companies you know and love.</p>
          <input 
            type="text"
            placeholder="username"
            name="username"
            className="signup-input-field make-readonly"
            value={userInput.username}
            onChange={(e) => handleInput(e)}
          />
          <input 
            type="text"
            placeholder="email address"
            name="email"
            className="signup-input-field make-readonly"
            value={userInput.email}
            onChange={(e) => handleInput(e)}
          />
          <input 
            type="password"
            placeholder="password (min. 6 characters)"
            name="password"
            className="signup-input-field make-readonly"
            value={userInput.password}
            onChange={(e) => handleInput(e)}
          />
          <input 
            type="number"
            placeholder="Initial buying power (up to ten million)"
            name="buying_power"
            value={userInput.buying_power}
            min="0"
            max="10000000"
            className="quantity-chooser signup-input-field"
            onChange={(e) => handleInput(e)}
          />
          <input
            type="submit"
            value="Get Started"
            className="signup-submit"
          />
        </form>
        <div className="oauth-signup-container">
          <GoogleLogin
            clientId="254946018512-0dqs14at73oms2h69u8ugpjoir67935g.apps.googleusercontent.com"
            buttonText="Use Google Credentials"
            className="google-signup-button"
            onSuccess={responseGoogle}
            onFailure={responseErrorGoogle}
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
            callback={responseFacebook}
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="oauth-signup facebook-signup"
              >Facebook Credentials</button>
            )}
          />
        </div>
        <div className="signup-alternatives">
          <p className="already-a-user" onClick={handleDemoSignin}>Demo User</p>
          <Link to="/signin"><p className="already-a-user">Already a user? Sign in here</p></Link>
        </div>
        <div className="signin-errors-arr">
          <p className="placeholder-yo">yo</p>
          {errorsArr}
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = state => ({
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  signup: (formUser) => dispatch(signupUser(formUser)),
  signin: (formUser) => dispatch(loginUser(formUser)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);