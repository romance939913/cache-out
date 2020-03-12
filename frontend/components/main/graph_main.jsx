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
    }
    
    render() {  
        if(Object.keys(this.props.prices).length >= Objct.keys(this.props.holdings).length) {
            
        }
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
                <h2></h2>
                <h2 className ="main-page-buying-power">Current Cash Balance: {`$${cash.toFixed(2)}`}</h2>
                {renderLineChart}
            </div>
        )
    }
}

export default GraphMain