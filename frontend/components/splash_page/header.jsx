import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="splash-navigation-bar">
                    <div className="splash-navigation-bar-left-side">
                        <a href=""><img src={window.logo_pic} /></a>
                        <a href="https://github.com/romance939913/">
                            <img src={window.github_pic} alt=""/>
                        </a>
                        <a href="https://www.linkedin.com/in/brennanromance/">
                            <img src={window.linkedin_pic} alt=""/>
                        </a>
                        <a href="">
                            <img src={window.info_pic} alt=""/>
                        </a>
                    </div>
                    <div className="splash-navigation-bar-right-side">
                        <Link 
                            className="splash-navigation-sign-in" 
                            to="/signin">Sign in</Link>
                        <Link 
                            className="splash-navigation-sign-up"
                            to="/signup">Sign Up</Link>
                    </div>
                </div>
                
            </div>
        )
    }
};

export default Header