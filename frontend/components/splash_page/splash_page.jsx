import React from 'react';
import Header from './header'
import ContentAndFooter from './content_and_footer';
import SplashCover from './cover';
import ReactGA from 'react-ga';

ReactGA.initialize('G-3K1ZZJZ07F');

class SplashPage extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <SplashCover 
                    login={this.props.login}
                    logoutUser={this.props.logoutUser} 
                />
                <ContentAndFooter />
            </div>
        )
    }
}

export default SplashPage;