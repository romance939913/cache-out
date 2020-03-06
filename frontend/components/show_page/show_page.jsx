import React from 'react';
import NavContainer from '../main/nav/nav_container';
import ShowPageGraph from './graph_container';


class ShowPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.profile
    }

    componentDidMount() {
        this.props.receiveProfile(this.props.ticker)
    }

    componentDidUpdate(previousProps) {
        if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
            this.props.receiveProfile(this.props.ticker)
        }
    }

    render() {
        let about;
        let prof_attributes = [];
        if(!this.props.profile) {
            return null; 
        } else {
            // debugger
            let about = (<li>{this.props.profile.description}</li>)
            // delete this.props.profile.description;
            let attributes = Object.keys(this.props.profile)
            attributes.forEach(attr => {
            prof_attributes.push(<div className="company-attr-item">
                                    <li className="company-attr-key">{attr}</li> 
                                    <li className="company-attr-value">{this.props.profile[attr]}</li>
                                </div>)
            })
        }
        
        return (
            <div>
                <NavContainer />
                <br/>
                <ShowPageGraph ticker={this.props.ticker}/>
                <br/>
                <ul className="company-profile">
                    <div>
                        <li>about</li>
                        <li>{about}</li>
                    </div>
                    {prof_attributes}
                </ul>
                <li>{this.props.profile.description}</li>
            </div>
        );
    }
}

export default ShowPage;