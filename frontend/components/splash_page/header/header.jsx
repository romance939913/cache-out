import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="splash-navigation-bar">
                    <div className="splash-navigation-bar-left-side">
                        <a href=""><img src="assets/logo.png" /></a>
                        <a href="https://github.com/romance939913/">
                            <img src="assets/github.jpg" alt=""/>
                        </a>
                        <a href="https://www.linkedin.com/in/brennanromance/">
                            <img src="assets/linkedin.png" alt=""/>
                        </a>
                        <a href="">
                            <img src="assets/info.png" alt=""/>
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