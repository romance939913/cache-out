import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';


class GraphMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equityBalance: [],
            time: "1d"

        };
    }

    componentDidMount() {
        let tickers = this.props.tickers;
        tickers.forEach((ticker, idx) => {
            this.props.receiveRealTimePrice(ticker);
        });
    }
    
    render() {  
        let totalEquity = 0;
        // console.log(this.props.price);
        // console.log("price props")
        // console.log(this.props.ticker)
        // console.log("ticker props")
        if (Object.keys(this.props.price).length !== this.props.tickers.length) return null;

        this.props.tickers.forEach((ticker, idx) => {
            if(this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        });

        return (
            <div>
                <h2 className="main-page-total-assets">{`$${(this.props.cash + totalEquity).toFixed(2)}`}</h2>
                <p className ="main-page-buying-power">Cash balance: {`$${(this.props.cash).toFixed(2)}`}</p>
            </div>
        )
    }
}

export default GraphMain