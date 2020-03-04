import React from 'react';
import {Link} from 'react-router-dom'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signin(user);
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
    return(
      <div className="signin-container">
        <img className="image-signin-bg" src="assets/signin_bg.png" alt=""/>
        <div className="signin-form">
          <form className="signin-box" onSubmit={this.handleSubmit}>
            <h3 className="signin-welcome-header">Welcome to Stock Overflow</h3>
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
            {this.renderErrors()}
            <Link to="/" className="forgot-user-pass">Forgot your username/password?</Link>
            <input type="submit" value="Sign In" className="signin-submit"/>
          </form>
        </div>
      </div>
    )
  }
};

export default Signin;
