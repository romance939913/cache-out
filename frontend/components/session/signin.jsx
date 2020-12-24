import React from 'react';
import {Link} from 'react-router-dom';
import { useReducer } from 'react';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { loginUser, clearSessionErrors, logoutUser } from '../../actions/session_actions';

function Signin(props) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }), 
    { username: '', password: '' });

  const handleInput = event => {
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
    const user = Object.assign({}, userInput);
    props.signin(user);
    setTimeout(() => { props.clearSessionErrors() }, 3000);
  }

  function responseGoogle(response) {
    const user = {
      username: response.profileObj.givenName,
      password: `g$${response.profileObj.googleId}`
    }
    props.signin(user);
    setTimeout(() => { props.clearSessionErrors() }, 3000);
  }

  function responseErrorGoogle(response) {
    console.log("google response error");
    console.log(response);
  }

  function responseFacebook(response) {
    let firstName = response.name.split(" ")[0];
    let user = {
      username: firstName,
      password: `f$${response.id}`
    };
    props.signin(user);
    setTimeout(() => { props.clearSessionErrors() }, 3000);

  }

  const errorsArr = [];
  props.errors.map((error, i) => {
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
          <form onSubmit={handleSubmit}>
            <h3 className="signin-welcome-header">Welcome to Cache Out</h3>
            <br/>
            <label className="signin-form-label">username
              <input 
                className="signin-input-field"
                name="username"
                type="text"
                value={userInput.username}
                onChange={(e) => handleInput(e)}
              />
              <br/>
            </label>
            <label className="signin-form-label">Password
              <input 
                className="signin-input-field"
                name="password"
                type="password"
                value={userInput.password}
                onChange={(e) => handleInput(e)}
              />
            </label>
            <div className="signin-links-container">
              <Link to="/"><p className="signin-alt-links">Back to splash page</p></Link>
              <p onClick={handleDemoSignin} className="signin-alt-links">Demo User</p>
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
              onSuccess={responseGoogle}
              onFailure={responseErrorGoogle}
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
              callback={responseFacebook}
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
};

const mapStateToProps = state => ({
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser()),
  signin: (formUser) => dispatch(loginUser(formUser)),
  clearSessionErrors: () => dispatch(clearSessionErrors())
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
