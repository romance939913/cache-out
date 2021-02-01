import React from 'react';
import GraphMain from './graph_main';
import Portfolio from './portfolio';
import Feed from '../feed';
import RingLoader from "react-spinners/RingLoader";
import Holidays from 'date-holidays';
import moment from 'moment';
import Navbar from '../main/nav/nav'
import { connect } from 'react-redux';
import { getHoldings, getUserBP } from '../../actions/holding_actions';
import { getAllTransactions } from '../../actions/transaction_actions';
import { receiveNews, receiveSnapshots, clearGraphPrices, receiveMultipleDays } from '../../actions/graph_actions';
import { clearRealTimePrice, receiveRealTimePrice, receiveRealTimePrices } from '../../actions/security_actions';

class MainFeed extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.clearGraphPrices()
        let creds = {
            user_id: this.props.currentUser.id
        }
        this.props.getAllTransactions(creds)
        this.props.getUserBP(this.props.currentUser.id);
        this.props.receiveNews();
        this.props.receiveSnapshots(this.props.currentUser.id)
        this.props.getHoldings(creds)
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
                        }, 1000);
                    } else if (idx % 4 === 0) {
                        setTimeout(() => {
                            this.props.receiveMultipleDays(ticker)
                            console.log('waiting %4')
                        }, 750);
                    } else if (idx % 5 === 0) {
                        setTimeout(() => {
                            this.props.receiveMultipleDays(ticker)
                            console.log('waiting %5')
                        }, 500);
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
            || this.props.news.length === 0
            || this.props.transactions.length === 0
            || JSON.stringify(this.props.snapshots) === '{}') {
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

        let holidays = new Holidays('US');
        let hd = holidays.isHoliday(new Date());
        let holidayMessage
        if (!!hd.name && (hd.type === 'bank' || hd.type === 'public')) {
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
                            <Feed 
                                calledFrom={'main'}
                            />
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
    graphPrices: state.entities.graphPrices,
    transactions: state.entities.transactions
});

const mapDispatchToProps = dispatch => ({
    getHoldings: (holding) => dispatch(getHoldings(holding)),
    receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
    receiveRealTimePrices: (ticker) => dispatch(receiveRealTimePrices(ticker)),
    receiveMultipleDays: (ticker) => dispatch(receiveMultipleDays(ticker)),
    getUserBP: (user) => dispatch(getUserBP(user)),
    getAllTransactions: (creds) => dispatch(getAllTransactions(creds)),
    receiveNews: () => dispatch(receiveNews()),
    clearRealTimePrice: () => dispatch(clearRealTimePrice()),
    receiveSnapshots: (userId) => dispatch(receiveSnapshots(userId)),
    clearGraphPrices: () => dispatch(clearGraphPrices())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainFeed);