import React from 'react';
import NavSearchForm from './nav_search_form';

class MainNav extends React.Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <img src="assets/logo.png" alt=""/>
          <NavSearchForm />
          <button onClick={() => this.props.logout()}>logout</button>
        </div>
        <div className="nav-right">
          <a href="">Home</a>
          <a href="">Messages</a>
          <a href=""className="account-dropdown">Account</a>
        </div>
      </div>
    );
  }
}

export default MainNav;