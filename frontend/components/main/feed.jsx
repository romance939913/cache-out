import React from 'react';
import GraphMainContainer from './graph_main_container';
import PortfolioContainer from './portfolio_container';
import RingLoader from "react-spinners/RingLoader";

class MainFeed extends React.Component {

    componentDidMount() {
        this.props.clearGraphPrices()
        let holding = {
            user_id: this.props.currentUser.id
        }
        this.props.getUserBP(this.props.currentUser.id);
        this.props.receiveNews();
        this.props.receiveSnapshots(this.props.currentUser.id)
        this.props.getHoldings(holding)
            .then(holdings => {
                Object.keys(holdings.holdings).forEach(ticker => {
                    this.props.receiveRealTimePrice(ticker)
                    this.props.receiveMultipleDays(ticker)
                })
            })
    }

    componentWillUnmount() {
        this.props.clearRealTimePrice()
        this.props.clearGraphPrices()
    }
    
    render() {
        if (Object.keys(this.props.price).length !== Object.keys(this.props.holdings).length
            || Object.keys(this.props.graphPrices).length !== Object.keys(this.props.price).length
            || this.props.cash.length === 0
            || this.props.news.length === 0) {
            return (
                <div className="show-page-loading">
                    <RingLoader
                        css={""}
                        size={150}
                        color={"#21ce99"}
                        loading={true}
                    />
                </div>
            )
        }
        
        let newsArr = [];
        this.props.news.forEach((ele, idx) => {
            if (this.props.news[idx].urlToImage) {
                newsArr.push(
                    <a key={idx} target="_blank" href={`${this.props.news[idx].url}`}>
                        <div className="news-item-wrapper">
                            <img  className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt=""/>
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
            }
        }) 
            
        return (
            <div>
                <div className="main-page-wrapper">
                    <div className="graph-news-wrapper">
                        <GraphMainContainer 
                            tickers={Object.keys(this.props.holdings)} 
                            price={this.props.price}
                        />
                        <h1 className="news-header">Today's Top Stories</h1>
                        <div id="news-container-feed" className="news-container">
                            {newsArr}
                        </div>
                    </div>
                    <div className="portfolio-wrapper">
                        <PortfolioContainer 
                            price={this.props.price}
                            tickers={Object.keys(this.props.holdings)}
                            graphPrices={this.props.graphPrices}
                            holdings={this.props.holdings}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainFeed;