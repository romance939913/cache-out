import React from 'react';
import Header from './header'
import Cover from './cover'
import ContentAndFooter from './content_and_footer';

class SplashPage extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <Cover />
                <ContentAndFooter />
            </div>
        )
    }
}

export default SplashPage;