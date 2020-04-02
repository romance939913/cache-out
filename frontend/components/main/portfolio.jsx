import React from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.currentUser.id
        }
    }
    
    render() {
        let tickerArr = [];
        if (this.props.tickers.length === 0) {
            return (
                <div className="holdings-portfolio">
                    <p className="portfolio-header">portfolio</p>
                    {tickerArr}
                </div>
            );
        }

        Object.values(this.props.holdings).forEach((ticker, idx) => {
            if (ticker.quantity !== 0) {
                tickerArr.push(<Link
                    to={`/show/${ticker.ticker}`}
                    key={idx}>
                    <li key={idx} className="holding-portfolio-li-wrapper">
                        <div className="holding-portfolio-li">
                            <div className="portfolio-ele">
                                <p>{ticker.ticker}</p>
                                <p className="ticker-quantity">{ticker.quantity} shares</p>
                            </div>
                            <div className="portfolio-ele">
                                <p>Trading at:</p>
                                <p className="trading-at">${this.props.price[ticker.ticker].price.toFixed(2)}</p>
                            </div>
                        </div>
                    </li>
                </Link>)
            }
        })

        return (
            <div className="holdings-portfolio">
                <p className="portfolio-header">portfolio</p>
                {tickerArr}
            </div>
        );
    }
}

export default Portfolio;