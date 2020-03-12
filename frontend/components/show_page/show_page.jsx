import React from 'react';
import NavContainer from '../main/nav/nav_container';
import ShowPageGraph from './graph_container';
import TransactionContainer from './transaction_container';


class ShowPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.props.profile;
    }

    componentDidMount() {
        this.props.receiveProfile(this.props.ticker);
        this.props.receiveRealTimePrice(this.props.ticker);
    }

    componentDidUpdate(previousProps) {
        if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
            this.props.receiveProfile(this.props.ticker);
            this.props.receiveRealTimePrice(this.props.ticker);
        }
    }

    render() {
        let about;
        let profile_attributes = [];
        let name;
        if(!this.props.profile.description || JSON.stringify(this.props.price) === '{}') {
            return null; 
        } else {
            about = (<li>{this.props.profile.description}</li>)
            name = (<li>{this.props.profile.companyName}</li>)
            // delete this.props.profile.description;
            let attributes = Object.keys(this.props.profile)
            attributes.forEach((attr, idx) => {
            profile_attributes.push(<div className="company-attr-item">
                                    <li key={idx} className="company-attr-key">{attr}</li> 
                                    <li className="company-attr-value">{this.props.profile[attr]}</li>
                                </div>)
            })
        }
        return (    
            <div>
                <NavContainer />
                <div className="show-page-body-wrapper">
                    <div className="graph-transaction-wrapper">
                        <div className="graph-and-title-wrapper">
                            <h1 className="show-company-name">{name}</h1>
                            <ShowPageGraph 
                                ticker={this.props.ticker}
                                price={this.props.price}
                            />
                        </div>
                        <TransactionContainer 
                            ticker={this.props.ticker}
                            price={this.props.price} 
                        />
                    </div>
                    <ul className="company-profile">
                        <div>
                            <h2>about</h2>
                            <li>{about}</li>
                        </div>
                        {profile_attributes}
                    </ul>
                    <li>{this.props.profile.description}</li>
                </div>
            </div>
        );
    }
}

export default ShowPage;