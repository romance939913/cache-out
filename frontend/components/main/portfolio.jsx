import React from 'react';
import { Link } from 'react-router-dom'

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.currentUser.id
        }
    }

    componentDidMount() {
        let tickers = this.props.tickers;
        debugger
        tickers.forEach((ticker, idx) => {
            this.props.receiveRealTimePrice(ticker);
        });
    }
    
    render() {
        let tickerArr = [];
        if (Object.keys(this.props.price).length !== this.props.tickers.length) {
            return null;
        }
        debugger
        Object.values(this.props.holdings).forEach((ticker, idx) => {
            if (ticker.quantity !== 0) {
                tickerArr.push(<Link
                    to={`/show/${ticker.ticker}`}
                    key={idx}>
                    <li key={idx} className="holding-portfolio-li-wrapper">
                        <div className="holding-portfolio-li">
                            <div className="portfolio-ele">
                                <p>{ticker.ticker}</p>
                                <p>{ticker.quantity}</p>
                            </div>
                            <div className="portfolio-ele">
                                <p>Trading at:</p>
                                <p>${this.props.price[ticker.ticker].price}</p>
                            </div>
                        </div>
                    </li>
                </Link>)
            }
        })

        return (
            <div>
                {tickerArr}
            </div>
        );
    }
}

export default Portfolio;