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
    
    render() {  
        let totalEquity = 0;
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