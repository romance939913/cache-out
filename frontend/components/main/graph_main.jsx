import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';


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

        let data = Object.values(this.props.snapshots)
        let color = '#21ce99'

        const renderLineChart = (
            <LineChart
                width={800}
                height={400}
                data={data}>
                <Line type="monotone" dataKey="valuation" stroke={color} dot={false} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis domain={['dataMin', 'dataMax']} />
                <XAxis dataKey='id' hide={true} />
                <Tooltip />
            </LineChart>
        );

        return (
            <div>
                <h2 className="main-page-total-assets">{`$${(this.props.cash + totalEquity).toFixed(2)}`}</h2>
                <p className ="main-page-buying-power">Cash balance: {`$${(this.props.cash).toFixed(2)}`}</p>
                {renderLineChart}
            </div>
        )
    }
}

export default GraphMain