import React from 'react';
import NavFormContainer from './nav_form_container';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      indexes: ''
    }
  }

  componentDidMount() {
    this.props.receiveIndexes()
    
  }

  render() {
    let indexesList
    if(!this.props.indexes.majorIndexesList) {
      return null
    } else {
      indexesList = this.props.indexes.majorIndexesList.map((index, idx) => <li key={idx} className="marquee-item">{index.ticker} {index.changes}</li>)
    }

    return (
      <div className="nav_plus_quotron">
        <div className="nav-bar">
          <div className="nav-left">
            <img src={window.logo_pic} alt=""/>
            <NavFormContainer />
          </div>
          <div className="nav-right">
            <Link to="/feed" className="nav-right-ele">Home</Link>
            <a href="" className="nav-right-ele">Messages</a>
            <a className="nav-right-ele" onClick={() => this.props.logout()}>logout</a>
          </div>
        </div>

      </div>
    );
  }
}

export default MainNav;