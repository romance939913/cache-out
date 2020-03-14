import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip} from 'recharts';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.changeTimeFrames = this.changeTimeFrames.bind(this);
        this.handleTimeFrameSelect = this.handleTimeFrameSelect.bind(this);
        this.state = { 
            time: '1d',
        };
    }

    componentDidMount() {
        this.props.receiveDay(`${this.props.ticker}`)
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            this.props.receiveDay(`${this.props.ticker}`);
        }
    }

    handleHover(e) {
        const ele = document.getElementById("real-time-price");
        ele.textContent = `$${e.activePayload[0].value.toFixed(2)}`;
    }

    handleMouseLeave() {
        const ele = document.getElementById("real-time-price");
        let symbol = this.props.ticker;
        ele.textContent= `$${this.props.price[symbol].price.toFixed(2)}`;
    }

    changeTimeFrames(newFrame) {
        this.setState({ time: newFrame });
        this.handleTimeFrameSelect(newFrame);
    }

    handleTimeFrameSelect(time) {
        switch (time) {
            case "1d":
                this.props.receiveDay(`${this.props.ticker}`);
                break;
            case "1w":
                this.props.receiveWeek(`${this.props.ticker}`);
                break;
            case "1m":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "3m":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "1y":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "5y":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
        }
    }
    
    render() {

        if (this.props.graphPrices.length === 0 || this.props.price[this.props.ticker] === undefined) {
            return null
        }
        
        let data = this.props.graphPrices;
        data = data.slice()
        let d = new Date();
        let date = d.getDate().toString();
        let dateFix = date.padStart(2, "0");
        if (this.state.time === "1d") {
            //     data = data.filter(obj => {
            //     let oDate = obj.date.split(" ");
            //     let oday = oDate[0].split("-");
            //     return oday[2] === dateFix;
            // });
            data = data.reverse();
            data = data.slice(1);
        } else if (this.state.time === "1w") {
            data = data.slice();
            data = data.reverse();
        } else if (this.state.time === "1m") {
            data = this.props.graphPrices.slice(-31);
        } else if (this.state.time === "3m") {
            data = this.props.graphPrices.slice(-93);
        } else if (this.state.time === "1y") {
            data = this.props.graphPrices.slice(-261);
        }

        let color

        if (data[0] !== undefined && data[0].close > data.slice(-1)[0].close) {
            color = '#ff0000';
        } else {
            color = '#21ce99';
        }

        const renderLineChart = (
            <LineChart 
                width={800} 
                height={400} 
                data={data} 
                onMouseMove={this.handleHover} 
                onMouseLeave={this.handleMouseLeave}>
                <Line type="monotone" dataKey="close" stroke={color}/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <XAxis dataKey='date' hide={true}/>
                <Tooltip />
            </LineChart>
        );

        
        return (
            <div className="graph-wrapper">
                {/* actual css variables google: dark mode css themes */}
                {/* custom tooltip Ronil's gh */}
                <li className="show-stock-price" id="real-time-price">${`${this.props.price[this.props.ticker].price.toFixed(2)}`}</li>
                {renderLineChart}
                <ul className="stock-time-frames">
                    {/* classname ternary for active link (state) */}
                    <li onClick={() => this.changeTimeFrames("1d")} className="stock-time-frame">1D</li>
                    <li onClick={() => this.changeTimeFrames("1w")} className="stock-time-frame">1W</li>
                    <li onClick={() => this.changeTimeFrames("1m")} className="stock-time-frame">1M</li>
                    <li onClick={() => this.changeTimeFrames("3m")} className="stock-time-frame">3M</li>
                    <li onClick={() => this.changeTimeFrames("1y")} className="stock-time-frame">1Y</li>
                    <li onClick={() => this.changeTimeFrames("5y")} className="stock-time-frame">5Y</li>
                </ul>
            </div>
        )
    }
}

export default ShowPageGraph