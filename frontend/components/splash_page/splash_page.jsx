import React from 'react';
import Header from './header'
import ContentAndFooter from './content_and_footer';
import SplashCover from './cover';

class SplashPage extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <SplashCover login={this.props.login} />
                <ContentAndFooter />
            </div>
        )
    }
}

export default SplashPage;