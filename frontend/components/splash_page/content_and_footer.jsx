import React from 'react';

class ContentAndFooter extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      picture: window.manage_pic
    }
  }

  handleClick(picture_name) {
    return e => {
      if (picture_name === "learn") {
        this.setState({ picture: window.learn_pic })
      } else if (picture_name === "manage") {
        this.setState({ picture: window.manage_pic })
      } else {
        this.setState({ picture: window.customize_pic})
      }
    }
  }

  render() {
    return (
      <div>
        <div className="carousel-wrapper">
          <div className="carousel-track">
            <li className="carousel-slide">
              <img className="carousel-pic" src={window.learn_pic}/>
            </li>
          </div>
          <ul className="carousel-nav">
            <li onClick={() => this.handleClick("learn")} className="carousel-slide-indicator">Learn</li>
            <li onClick={() => this.handleClick("manage")} className="carousel-slide-indicator">Manage</li>
            <li onClick={() => this.handleClick("customize")} className="carousel-slide-indicator">Customize</li>
          </ul>
          <div className="carousel-slide-description">
            <h1>
              Learn as you grow
            </h1>
            <p>
              Keep your portfolio in your pocket. Everything you need to manage your assets is available in a single app.
            </p>
          </div>
        </div>
        <div className="marquee">
        </div>
      </div>
    )
  }
}

export default ContentAndFooter;