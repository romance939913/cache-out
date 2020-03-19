import React from 'react';

class ContentAndFooter extends React.Component {



  handleClick(buttonName) {
    return e => {
      // console.log(buttonName)
    }
  }

  render() {
    return (
      <div>
        <div className="carousel-wrapper">
          <ul className="carousel-track" id="carousel-track">
            <li className="carousel-slide">
              <img className="carousel-pic" src={window.learn_pic}/>
            </li>
            <li className="carousel-slide">
              <img className="carousel-pic" src={window.manage_pic}/>
            </li>
            <li className="carousel-slide">
              <img className="carousel-pic" src={window.customize_pic}/>
            </li>
          </ul>
          <ul className="carousel-nav">
            <button onClick={() => this.handleClick("Learn")} className="carousel-slide-indicator">Learn</button>
            <button onClick={() => this.handleClick("Manage")} className="carousel-slide-indicator">Manage</button>
            <button onClick={() => this.handleClick("Customize")} className="carousel-slide-indicator">Customize</button>
          </ul>
        </div>
        <div className="marquee">
        </div>
      </div>
    )
  }
}

export default ContentAndFooter;