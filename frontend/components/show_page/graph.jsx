import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.receiveDay(`${this.props.ticker}`)
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            this.props.receiveDay(`${this.props.ticker}`)
        }
    }

    render() {
        let data;
        if (!this.props.receiveDay) {
            return null;
        } else {
            data = this.props.dayPrices;
            let top;
            let bottom;
            for(let i = 1; i < data.length; i++) {
                
            }
        }

        const renderLineChart = (
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="close" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <YAxis />
            </LineChart>
        );
        return (
            <div>
                {renderLineChart}
            </div>
        )
    }
}

export default ShowPageGraph