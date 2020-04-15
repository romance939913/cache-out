import React from 'react';
import NavSearchContainer from './nav_search_container';
import { Link } from 'react-router-dom';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: '',
      mode: 'light'
    };
    this.changeTheme = this.changeTheme.bind(this)
  }

  componentDidMount() {
    this.props.receiveStocks();
    this.props.receiveIndexes();
  }

  // handleDarkMode() {
  //   let mode = document.getElementById("dark-mode");
  //   let modeClasses = Array.from(mode.classList);
  //   let body = document.body;
  //   let newsItems = document.getElementsByClassName("news-container");
  //   console.log(newsItems[0].children)
  //   debugger
  //   if (modeClasses.includes("active")) {
  //     mode.classList.remove("active");
  //     body.classList.remove("dark-mode");
  //     newsItems.forEach((ele, idx) => {
  //       ele.classList.remove("white")
  //     })
  //     newsItems.classList.remove("white");
  //   } else {
  //     mode.classList.add("active")
  //     body.classList.add("dark-mode")
  //     newsItems.forEach((ele, idx) => {
  //       ele.classList.add("white")
  //     })
  //   }
  // }

  changeTheme() {
    var currentTheme = document.body.getAttribute("data-theme")
    var docBody = document.body
    if (currentTheme === "light") {
      docBody.setAttribute("data-theme", "dark");
      this.setState({ mode: "dark" });
    }
    else {
      docBody.setAttribute("data-theme", "light");
      this.setState({ mode: "light" });
    }
  }

  render() {
    if (this.props.stocks.length === 0) return null;
    if (this.props.indexes.majorIndexesList === undefined) return null;

    let lis = [];
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
    while (lis.length  < 300) {
      lis.push(indexes.map((index, idx) => {
        let color;
        let idxChanges = this.props.indexes.majorIndexesList[index].changes;
        if (idxChanges < 0) {
          color = "red"
        } else {
          color = 'green';
          idxChanges = "+" + this.props.indexes.majorIndexesList[index].changes.toString();
        }
        return(
          <li
            key={idx}
            className="marquee-item">
              <div className={`marquee-item-data ${color}`}>
                {this.props.indexes.majorIndexesList[index].indexName}
              </div>
              <div className={`marquee-item-data ${color}`}>
                {this.props.indexes.majorIndexesList[index].price.toString()}
              </div>
              <div className={`marquee-item-data ${color}`}>
                {idxChanges}
            </div>
          </li>
        )
      }))
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
            <Link to="/feed" className="nav-right-ele">
              <img className="main-nav-logo" src={window.logo_pic} alt=""/>
            </Link>
          </div>
          <div className="nav-search-box">
            <NavSearchContainer stocks={this.props.stocks} />
          </div>
          <div className="nav-right">
            <Link to="/feed" className="nav-right-ele">Home</Link>
            <p className="nav-right-ele" id="dark-mode" onClick={this.changeTheme}>Dark Mode</p>
            <a className="nav-right-ele" onClick={() => this.props.logout()}>logout</a>
          </div>
        </div>
      </div>
    );
  }
}

export default MainNav;