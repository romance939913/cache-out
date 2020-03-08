import React from 'react';
import NavContainer from '../main/nav/nav_container';
import ShowPageGraph from './day_graph/day_graph_container';


class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.profile;
    }

    componentDidMount() {
        this.props.receiveProfile(this.props.ticker);
    }

    componentDidUpdate(previousProps) {
        if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
            this.props.receiveProfile(this.props.ticker);
        }
    }

    render() {
        let about;
        let profile_attributes = [];
        let name;
        if(!this.props.profile.description) {
            return null; 
        } else {
            about = (<li>{this.props.profile.description}</li>)
            name = (<li>{this.props.profile.companyName}</li>)
            // delete this.props.profile.description;
            let attributes = Object.keys(this.props.profile)
            attributes.forEach(attr => {
            profile_attributes.push(<div className="company-attr-item">
                                    <li className="company-attr-key">{attr}</li> 
                                    <li className="company-attr-value">{this.props.profile[attr]}</li>
                                </div>)
            })
        }
        
        return (    
            <div>
                <NavContainer />
                <br/>
                <h1>{name}</h1>
                <ShowPageGraph ticker={this.props.ticker}/>
                <br/>
                <ul className="company-profile">
                    <div>
                        <li>about</li>
                        <li>{about}</li>
                    </div>
                    {profile_attributes}
                </ul>
                <li>{this.props.profile.description}</li>
            </div>
        );
    }
}

export default ShowPage;