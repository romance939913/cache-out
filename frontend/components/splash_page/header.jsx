import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    render() {
        return (
            <div>
                <div className="splash-navigation-bar">
                    <div className="splash-navigation-bar-left-side">
                        <p className="website-title">Cache Out</p>
                        <img src={window.logo_pic} className="logo-icon"/>
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