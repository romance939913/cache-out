import React from 'react';
import Header from './header/header'
import Cover from './cover/cover'

class SplashPage extends React.Component {

    render() {
        return(
            <div>
                <Header />
                <Cover />
            </div>
        )
    }
}

export default SplashPage;