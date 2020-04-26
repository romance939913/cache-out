import React from 'react';

class ContentAndFooter extends React.Component {

  moveToSlide(track, currentSlide, targetSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    currentSlide.classList.remove('animated');
    currentSlide.classList.remove('fadeIn');
    targetSlide.classList.add('current-slide');
    targetSlide.classList.add('animated');
    targetSlide.classList.add('fadeIn');
  }

  updateColor(currentWord, targetWord) {
    currentWord.classList.remove('current-slide')
    targetWord.classList.add('current-slide')
  }

  componentDidMount() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const leftButton = document.querySelector('.carousel-button-left');
    const rightButton = document.querySelector('.carousel-button-right');
    const words = document.querySelector('.carousel-nav');
    const wordsArr = Array.from(words.children)

    slides[0].style.left = '0px';
    slides[1].style.left = '250px';
    slides[2].style.left = '500px';

    words.addEventListener('click', (e) => {
      let targetWord = e.target.closest('li')
      if (!targetWord) return;
      const currentSlide = track.querySelector('.current-slide');
      const currentWord = words.querySelector('.current-slide');
      const targetIndex = wordsArr.findIndex(word => word === targetWord)
      const targetSlide = slides[targetIndex]

      this.moveToSlide(track, currentSlide, targetSlide)
      this.updateColor(currentWord, targetWord)
      this.hideArrows(leftButton, rightButton, targetIndex)
    })
  }

  render() {
    return (
      <div>
        <div className="carousel-wrapper">
          <div className="carousel-nav-wrapper">
            <div className="carousel-track-container">
              <ul className="carousel-track">
                <li className="carousel-slide current-slide">
                  <img className="carousel-pic" src={window.learn_pic}/>
                </li>
                <li className="carousel-slide">
                  <img className="carousel-pic" src={window.customize_pic}/>
                </li>
                <li className="carousel-slide">
                  <img className="carousel-pic" src={window.manage_pic}/>
                </li>
              </ul>
            </div>
            <ul className="carousel-nav">
              <li className="carousel-slide-indicator current-slide">Learn</li>
              <li className="carousel-slide-indicator">Customize</li>
              <li className="carousel-slide-indicator">Manage</li>
            </ul>
          </div>
          <div className="ios-app-div">
            <h1 className="ios-app-header">iOS app coming Soon!</h1>
            <p className="ios-app-body">My goal is to make investing in financial markets more intuitive for everybody. 
            No matter how much experience you have (or don’t have), the Cache Out platform is a great place to start</p>
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
            
          </div>
          <div className="feedback-section">
            <p>I love feedback!</p>
            <p>Please open an issue if you find a bug</p>
            <p>I'm always improving this site</p>
          </div>
          <div className="my-profiles">
            <a target="_blank" href="https://github.com/romance939913/">
              <img className="info-icon" src={window.github_pic} alt="" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/brennanromance/">
              <img className="info-icon" src={window.linkedin_pic} alt="" />
            </a>
            <a target="_blank" href="https://www.linkedin.com/in/brennanromance/">
              <img className="info-icon" src={window.angellist_pic} alt="" />
            </a>
            <img className="info-icon" src={window.info_pic} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default ContentAndFooter;