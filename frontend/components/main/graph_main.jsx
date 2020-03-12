import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';


class GraphMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equityBalance: []
        };
    }

    componentDidMount() {
        let tickers = this.props.tickers;
        tickers.forEach((ticker, idx) => {
            this.props.receiveRealTimePrice(ticker);
        });
        this.props.receiveIndexes()
    }
    
    render() {  
        let totalEquity = 0
        if(Object.keys(this.props.price).length !== this.props.tickers.length) {
            return null
        }

        this.props.tickers.forEach((ticker, idx) => {
            if(this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        })

        let cash = this.props.currentUser.buying_power;
        const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },];
        const renderLineChart = (
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <YAxis />
                <Tooltip />
            </LineChart>
        );

        return (
            <div>
                <h2 className="main-page-total-assets">{`$${(cash + totalEquity).toFixed(2)}`}</h2>
                <h2 className ="main-page-buying-power">Cash balance: {`$${(cash).toFixed(2)}`}</h2>
                {renderLineChart}
            </div>
        )
    }
}

export default GraphMain