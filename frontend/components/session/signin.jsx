import React from 'react';
import {Link} from 'react-router-dom'

class Signin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        username: '',
        password: ''
    }
  }

  update() {
    return e => {
      this.setState({ [field]: e.currentTarget.value})
    }
  }

  render() {
    return(
      <div className="signin-page-body">
        <div className="signin-art">
          YOOOOO Other DIVVVVVVVV YOO
        </div>
        <div>
          <form>
            <h3>Welcome to Stock Overflow</h3>
            <label>username
              <input 
                type="text"
                value={this.state.username}
                onChange={this.update('username')}
              />
            </label>
            <label>Password
              <input 
                type="password"
                value={this.state.password}
                onChange={this.update('password')}
              />
            </label>
            <input type="submit" value="signin"/>
          </form>
          <Link to="/">Forgot your username/password?</Link>
        </div>
      </div>
    )
  }
};

export default Signin;
