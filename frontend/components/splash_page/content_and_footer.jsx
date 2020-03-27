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
        <div className="footer">
          <div className="contact-info">
            <div className="contact-information">
              <p>Creator: Brennan Romance</p>
              <p>brennan.romance@gmail.com</p>
              <p>cell: 954-531-3051</p>
            </div>
            <div className="my-profiles">
              <a href="https://github.com/romance939913/">
                <img className="info-icon" src={window.github_pic} alt="" />
              </a>
              <a href="https://www.linkedin.com/in/brennanromance/">
                <img className="info-icon" src={window.linkedin_pic} alt="" />
              </a>
              <a href="https://www.linkedin.com/in/brennanromance/">
                <img className="info-icon" src={window.angellist_pic} alt="" />
              </a>
              <a href="">
                <img className="info-icon" src={window.info_pic} alt="" />
              </a>
            </div>
          </div>
          <div className="feedback-section">
            <p>Please Leave Feedback!</p>
            <p>I'm always improving this site</p>
            <p>Link to Google Form</p>
          </div>
          <div className="help-section">
            <p>privacy</p>
            <p>About</p>
            <p>Terms and Conditions</p>
            <p>Disclosure Library</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ContentAndFooter;