import React from 'react';
import NavSearchForm from './nav_search_form';

class MainNav extends React.Component {

  render() {
    return (
      <div className="nav-bar">
        <div className="nav-left">
          <img src={window.logo_pic} alt=""/>
          <NavSearchForm />
        </div>
        <div className="nav-right">
          <a  className=""href="">Home</a>
          <a href="">Messages</a>
          <a onClick={() => this.props.logout()}>logout</a>
          {/* <a href=""className="account-dropdown">Account</a> */}
        </div>
      </div>
    );
  }
}

export default MainNav;