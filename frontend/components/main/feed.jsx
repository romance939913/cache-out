import React from 'react';
import MainNavContainer from './nav/nav_container';
import GraphMainContainer from './graph_main_container';
import PortfolioContainer from './portfolio_container';

class MainFeed extends React.Component {

    componentDidMount() {
        let holding = {
            user_id: this.props.currentUser.id
        }
        this.props.getHoldings(holding);
        this.props.getUserBP(this.props.currentUser.id)
        this.props.receiveNews();
    }
    
    render() {
        if (this.props.holdings.length === 0) return null;
        if (this.props.cash.length === 0) return null;
        if (this.props.news.length === 0) return null;

        let newsArr = [];
        this.props.news.forEach((ele, idx) => {
            newsArr.push(
                <a target="_blank" href={`${this.props.news[idx].url}`}>
                <div className="news-item-wrapper">
                    <img  className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt=""/>
                    <div className="news-item-content">
                        <div>
                            <li key={idx} className="news-item-website">{this.props.news[idx].source.name}</li>
                            <li key={idx + 30} className="news-item-title">{this.props.news[idx].title}</li>
                        </div>
                        <li key={idx + 60} className="news-item-description">{this.props.news[idx].description}</li>
                    </div>
                </div>
                </a>
            )
        })
            
        return (
            <div>
                <MainNavContainer />
                <div className="main-page-wrapper">
                    <div className="graph-valuation-wrapper">
                        <GraphMainContainer 
                            tickers={Object.keys(this.props.holdings)} 
                            cash={this.props.cash}
                        />
                        <div>
                            <h1>Today's Top Stories</h1>
                            {newsArr}
                        </div>
                    </div>
                    <div className="portfolio-wrapper">
                        <PortfolioContainer 
                            tickers={Object.keys(this.props.holdings)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default MainFeed;