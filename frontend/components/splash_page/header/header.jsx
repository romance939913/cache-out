import React from 'react';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    login() {
        this.props.history.replace('/signin');
    }

    signup() {
        this.props.history.replace('/signup');
    }

    render() {
        return (
            <div>
                <div className="splash-navigation-bar">
                    <div className="splash-navigation-bar-left-side">
                        <a href=""><img src="assets/logo.png" /></a>
                        <a href="">Products</a>
                        <a href="">Learn</a>
                        <a href="">Support</a>
                    </div>
                    <div className="splash-navigation-bar-right-side">
                        <Link 
                            className="splash-navigation-sign-in" 
                            to="/signin">Sign in</Link>
                        <Link 
                            className="splash-navigation-sign-up"
                            to="signup">Sign Up</Link>
                    </div>
                </div>
                
            </div>
        )
    }
};

export default Header