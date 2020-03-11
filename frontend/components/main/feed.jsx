import React from 'react';
import MainNavContainer from './nav/nav_container';
import GraphMainContainer from './graph_main_container';


class MainFeed extends React.Component {
    
    render() {
        return (
            <div>
                <MainNavContainer />
                <GraphMainContainer />
            </div>
        );
    }
}

export default MainFeed;