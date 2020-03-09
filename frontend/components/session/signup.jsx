import React from 'react';
import {Link} from 'react-router-dom'

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        email: '',
        password: '',
        buying_power: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => {
      this.setState({ [field]: e.currentTarget.value})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.signup(user);
  }

  renderErrors() {
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li className="session-errors"key={`error-${i}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return(
      <div className="signup-page-body">
        <form className="signup-form" onSubmit={this.handleSubmit}>
          <div className="money-move">
            <img src={window.logo_pic} alt=""/>
            <h3>Make your Money Move</h3>
          </div>
          <p className="signup-description">Stock Overflow lets you invest 
          in the companies you love, commission-free.</p>
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
          placeholder="password (min. 10 characters)"
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
          <input 
            type="submit" 
            value="Get Started" 
            className="signup-input-field signup-submit"
          />
          {this.renderErrors()}
          <Link to="/signin" className="already-a-user">already a user? Sign in here</Link>
        </form>

      </div>
    )
  }
};

export default Signup;