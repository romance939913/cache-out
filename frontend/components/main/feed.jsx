import React from 'react';

class MainFeed extends React.Component {
    
    render() {
        return (
            <div>
                <p>YOOO MAIN FEED YO!</p>
                <button onClick={() => this.props.logout()}>logout</button>
            </div>
        );
    }
}

export default MainFeed;