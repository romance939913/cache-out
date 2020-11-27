import React from 'react';
import GraphMain from './graph_main';
import Portfolio from './portfolio';
import RingLoader from "react-spinners/RingLoader";
import Holidays from 'date-holidays';
import Navbar from '../main/nav/nav_container'
import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import { receiveNews, receiveSnapshots, clearGraphPrices, receiveMultipleDays } from '../../actions/graph_actions';
import { clearRealTimePrice, receiveRealTimePrice, receiveRealTimePrices } from '../../actions/security_actions';

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
                let arr = Object.keys(holdings.holdings)
                this.props.receiveRealTimePrices(arr)
                arr.forEach((ticker, idx) => {
                    // this prevents exceeding the requests per millisecond for FMP API
                    // delays the request for some stocks by a second or half second
                    if (idx % 3 === 0) {
                        setTimeout(() => {
                            this.props.receiveMultipleDays(ticker)
                            console.log('waiting %3')
                        }, 500);
                    } else if (idx % 4 === 0) {
                        setTimeout(() => {
                            this.props.receiveMultipleDays(ticker)
                            console.log('waiting %4')
                        }, 750);
                    } else if (idx % 5 === 0) {
                        setTimeout(() => {
                            this.props.receiveMultipleDays(ticker)
                            console.log('waiting %5')
                        }, 1000);
                    } else {
                        this.props.receiveMultipleDays(ticker)
                    }
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
            || Object.keys(this.props.graphPrices).length !== Object.keys(this.props.holdings).length
            || this.props.cash.length === 0
            || this.props.news.length === 0) {
            return (
                <div>
                    <Navbar />
                    <div className="show-page-loading">
                        <RingLoader
                            css={""}
                            size={150}
                            color={"#21ce99"}
                            loading={true}
                        />
                    </div>
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

        let holidays = new Holidays('US');
        let hd = holidays.isHoliday(new Date());
        let holidayMessage
        if (!!hd.name) {
            holidayMessage = `Markets are closed today, Happy ${hd.name}`
        }
            
        return (
            <div>
                <Navbar />
                <div>
                    <div className="main-page-wrapper">
                        <div className="graph-news-wrapper">
                            <GraphMain 
                                tickers={Object.keys(this.props.holdings)} 
                                price={this.props.price}
                            />
                            <p className="markets-closed-message">
                                {holidayMessage}
                            </p>
                            <h1 className="news-header">Today's Top Stories</h1>
                            <div id="news-container-feed" className="news-container">
                                {newsArr}
                            </div>
                        </div>
                        <div className="portfolio-wrapper">
                            <Portfolio 
                                price={this.props.price}
                                tickers={Object.keys(this.props.holdings)}
                                holdings={this.props.holdings}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    holdings: state.entities.holdings,
    cash: state.entities.buyingPower,
    price: state.entities.price,
    news: state.entities.news,
    snapshots: state.entities.snapshots,
    graphPrices: state.entities.graphPrices
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveRealTimePrices: (ticker) => dispatch(receiveRealTimePrices(ticker)),
    receiveMultipleDays: (ticker) => dispatch(receiveMultipleDays(ticker)),
    getUserBP: (user) => dispatch(getUserBP(user)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice()),
    receiveSnapshots: (userId) => dispatch(receiveSnapshots(userId)),
    clearGraphPrices: () => dispatch(clearGraphPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);