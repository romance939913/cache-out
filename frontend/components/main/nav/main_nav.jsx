import React from 'react';

class MainNav extends React.Component {

    render() {
        return (
            <div>
                <p>YOOO MAIN FEED YO!</p>
                <button onClick={() => this.props.logout()}>logout</button>
            </div>
        );
    }
}

export default MainNav;