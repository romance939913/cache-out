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
    this.handleDemoSignin = this.handleDemoSignin.bind(this)
  }

  componentDidMount() {
    this.props.clearSessionErrors();
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
    let f = { username: 'demo6', password: 'password' };
    let g = { username: 'demo7', password: 'password' };
    let h = { username: 'demo8', password: 'password' };
    let i = { username: 'demo9', password: 'password' };
    let j = { username: 'demo10', password: 'password' };
    let array = [a, b, c, d, e, f, g, h, i, j];
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
                type="password"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>
            {this.renderErrors()}
            <Link to="/" className="forgot-user-pass">Back to splash page</Link>
            <div className="signin-submit-container">
              <input type="submit" value="Sign In" className="signin-submit"/>
              <p className="signin-submit" onClick={this.handleDemoSignin}>Demo user</p>
            </div>
          </form>
        </div>
      </div>
    )
  }
};

export default Signin;
