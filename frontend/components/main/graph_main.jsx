import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';

class GraphMain extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {  
        let cash = this.props.currentUser.buying_power;
        let tickers = Object.keys(this.props.holdings);
        let equityBalance = 0;
        tickers.forEach((ticker, idx) => {
            // debugger
            let price = this.props.receiveRealTimePrice(ticker)
            equityBalance = equityBalance + price
            // debugger
        })
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
                <h2></h2>
                <h2 className ="main-page-buying-power">Current Cash Balance: {`$${cash}`}</h2>
                {renderLineChart}
            </div>
        )
    }
}

export default GraphMain