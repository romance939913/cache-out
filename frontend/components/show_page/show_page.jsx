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
        this.props.receiveNews()
    }

    componentDidUpdate(previousProps) {
        if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
            this.props.receiveProfile(this.props.ticker);
            this.props.receiveRealTimePrice(this.props.ticker);
        }
    }

    componentWillUnmount() {
        this.props.clearRealTimePrice()
    }

    render() {

        if (this.props.profile.description === undefined) return null; 
        if (JSON.stringify(this.props.price) === '{}') return null;
        if (this.props.news.length === 0) return null;

        let newsArr = [];
        this.props.news.forEach((ele, idx) => {
            newsArr.push(
                <a target="_blank" href={`${this.props.news[idx].url}`}>
                    <div className="news-item-wrapper">
                        <img className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt="" />
                        <div className="news-item-content">
                            <div>
                                <li className="news-item-website">{this.props.news[idx].source.name}</li>
                                <li className="news-item-title">{this.props.news[idx].title}</li>
                            </div>
                            <li className="news-item-description">{this.props.news[idx].description}</li>
                        </div>
                    </div>
                </a>
            )
        })
        
        return (
            <div>
                <NavContainer />
                <div className="show-page-body-wrapper">
                    <div className="graph-transaction-wrapper">
                        <div className="graph-and-title-wrapper">
                            <h1 className="show-company-name">{this.props.profile.companyName}</h1>
                            <ShowPageGraph 
                                ticker={this.props.ticker}
                                price={this.props.price}
                            />
                            <ul className="company-profile">
                                <div>
                                    <li className="show-page-about-header">About</li>
                                    <li className="show-page-about-description">{this.props.profile.description}</li>
                                </div>
                                <div className="show-page-attr-wrapper">
                                    <div className="show-page-attr-item">
                                        <li>CEO</li>
                                        <li>{this.props.profile.ceo}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Sector</li>
                                        <li>{this.props.profile.sector}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Industry</li>
                                        <li>{this.props.profile.industry}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>exchange</li>
                                        <li>{this.props.profile.exchange}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Market Cap</li>
                                        <li>{this.props.profile.mktCap}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Last Dividend</li>
                                        <li>{this.props.profile.lastDiv}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Volume Average</li>
                                        <li>{this.props.profile.volAvg}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <li>Day change</li>
                                        <li>{this.props.profile.changes}</li>
                                    </div>
                                    <div className="show-page-attr-item"></div>
                                </div>
                            </ul>
                            <p className="news-show-header">News</p>
                            {newsArr}
                        </div>
                        <TransactionContainer 
                            ticker={this.props.ticker}
                            price={this.props.price} 
                            currentUser={this.props.currentUser}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowPage;