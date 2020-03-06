import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
        }
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
        if (this.props.dayPrices.length === 0) {
            return null;
        } else {
            data = this.props.dayPrices;
            let d = new Date()
            let date = d.getDate().toString()
            data.filter(obj => {
                let oDate = obj.date.split(" ");
                let oday = oDate[0].split("-");
                
            })
        }

        const renderLineChart = (
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="close" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <YAxis domain={['dataMin', 'dataMax']}/>
                <XAxis />
                <Tooltip />
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