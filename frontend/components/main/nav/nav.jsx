import React from 'react';
import NavFormContainer from './nav_form_container';

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
            <a className=""href="">Home</a>
            <a href="">Messages</a>
            <a onClick={() => this.props.logout()}>logout</a>
          </div>
        </div>

      </div>
    );
  }
}

export default MainNav;