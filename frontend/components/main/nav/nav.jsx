import React from 'react';
import NavSearchContainer from './nav_search_container';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: ''
    };
  }

  componentDidMount() {
    this.props.receiveStocks();
    this.props.receiveIndexes();
  }

  render() {
    let lis = [];
    if (JSON.stringify(this.props.stocks) === '{}' || this.props.indexes.majorIndexesList === undefined) {
      return null
    } else {
      // console.log(this.props.indexes.majorIndexesList[0].ticker)
      let shuffle = (a) => {
        let j, x, i;
        for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
        }
        return a;
      }
      let indexList = Object.keys(this.props.indexes.majorIndexesList);
      let indexes = shuffle(indexList);    
      while (lis.length < 300) {
        lis.push(indexes.map((index, idx) => <li 
                                              key={idx} 
                                              className="marquee-item">
                                              <div className="marquee-item-data">
                                                {this.props.indexes.majorIndexesList[index].indexName}
                                              </div>
                                              <div className="marquee-item-data">
                                                {this.props.indexes.majorIndexesList[index].price}
                                              </div>
                                              <div className="marquee-item-data">
                                                {`${this.props.indexes.majorIndexesList[index].changes}`}
                                              </div>
                                          </li>))

      }
    }

    return (
      <div className="nav_plus_quotron">
        <div className="marquee-wrapper">
          <marquee>
            <div className="cheesy-marquee">
              {lis}
            </div>
          </marquee>
        </div>
        <div className="nav-bar">
          <div className="nav-left">
            <img src={window.logo_pic} alt=""/>
            <NavSearchContainer />
          </div>
          <div className="nav-right">
            <Link to="/feed" className="nav-right-ele">Home</Link>
            <a className="nav-right-ele">Messages</a>
            <a className="nav-right-ele" onClick={() => this.props.logout()}>logout</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainNav;