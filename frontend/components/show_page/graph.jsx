import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            price: 0
        };
        this.handleHover = this.handleHover.bind(this);
    }

    componentDidMount() {
        this.props.receiveDay(`${this.props.ticker}`);
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            this.props.receiveDay(`${this.props.ticker}`);
        }
    }

    handleHover(e) {
        this.setState({ price: [e.activePayload[0].value] });
    }

    render() {
        let data;
        if (this.props.dayPrices.length === 0) {
            return null;
        } else {
            data = this.props.dayPrices;
            let d = new Date();
            let date = d.getDate().toString();
            let dateFix = date.padStart(2, "0");
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                let oday = oDate[0].split("-");
                return oday[2] === dateFix;
            });
        }

        const renderLineChart = (
            <LineChart width={400} height={400} data={data} onMouseOver={this.handleHover}>
                <Line type="monotone" dataKey="close" stroke="#8884d8"/>
                <CartesianGrid stroke="#ccc" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']}/>
                <Tooltip />
            </LineChart>
        );

        return (
            <div>
                actual css variables google: dark mode css themes
                {/* custom tooltip Ronil's gh */}
                <li>{/* vanilla js here */}</li>
                {renderLineChart}
                <ul className="stock-time-frames">
                    {/* classname ternary for active link (state) */}
                    <li className="stock-time-frame">1D</li>
                    <li className="stock-time-frame">1W</li>
                    <li className="stock-time-frame">1M</li>
                    <li className="stock-time-frame">3M</li>
                    <li className="stock-time-frame">1Y</li>
                    <li className="stock-time-frame">5Y</li>
                </ul>
            </div>
        )
    }
}

export default ShowPageGraph