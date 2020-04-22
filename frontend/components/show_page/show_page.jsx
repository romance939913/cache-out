import React from 'react';
import ShowPageGraph from './show_graph_container';
import TransactionContainer from './transaction_container';
import NavContainer from '../main/nav/nav_container';
import numeral from 'numeral';

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
        this.props.clearRealTimePrice();
    }

    render() {

        if (this.props.profile.description === undefined) return null; 
        if (JSON.stringify(this.props.price) === '{}') return null;
        if (this.props.news.length === 0) return null;

        let strMktCap = this.props.profile.mktCap.toString();
        let withoutExp = strMktCap.split("E")
        let withoutDecimal = withoutExp[0].split(".")
        let start = withoutDecimal[0] + withoutDecimal[1]
        let final = start.padEnd(parseInt(withoutExp[1]), "0")
        let formattedMktCap = numeral(parseInt(final)).format('0.0a')
        
        let newsArr = [];
        this.props.news.forEach((ele, idx) => {
            newsArr.push(
                <a key={idx} target="_blank" href={`${this.props.news[idx].url}`}>
                    <div className="news-item-wrapper">
                        <img className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt="" />
                        <div className="news-item-content">
                            <div>
                                <p className="news-item-website">{this.props.news[idx].source.name}</p>
                                <p className="news-item-title">{this.props.news[idx].title}</p>
                            </div>
                            <p className="news-item-description">{this.props.news[idx].description}</p>
                        </div>
                    </div>
                </a>
            )
        })
        
        return (
            <div>
                {/* <NavContainer /> */}
                <div className="show-page-body-wrapper">
                    <div className="graph-transaction-wrapper">
                        <div className="graph-and-title-wrapper">
                            <h3 className="show-company-name">{this.props.profile.companyName}</h3>
                            <ShowPageGraph 
                                ticker={this.props.ticker}
                                price={this.props.price}
                            />
                            <ul className="company-profile">
                                <div>
                                    <h3 className="show-page-about-header">About</h3>
                                    <li className="show-page-about-description">{this.props.profile.description}</li>
                                </div>
                                <div className="show-page-attr-wrapper">
                                    <div className="show-page-attr-item">
                                        <h3>CEO</h3>
                                        <li className="show-ceo">{this.props.profile.ceo}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Sector</h3>
                                        <li>{this.props.profile.sector}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Industry</h3>
                                        <li>{this.props.profile.industry}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>exchange</h3>
                                        <li>{this.props.profile.exchange}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Market Cap</h3>
                                        <li>{formattedMktCap}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Last Dividend</h3>
                                        <li>{this.props.profile.lastDiv}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Average Volume</h3>
                                        <li>{numeral(this.props.profile.volAvg).format('0,0.00')}</li>
                                    </div>
                                    <div className="show-page-attr-item">
                                        <h3>Day change</h3>
                                        <li>{this.props.profile.changes}</li>
                                    </div>
                                    <div className="show-page-attr-item"></div>
                                </div>
                            </ul>
                            <h3 className="news-show-header">News</h3>
                            <div>
                                {newsArr}
                            </div>
                        </div>
                        <div className="transaction-box">
                            <TransactionContainer 
                                ticker={this.props.ticker}
                                price={this.props.price} 
                                currentUser={this.props.currentUser}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ShowPage;