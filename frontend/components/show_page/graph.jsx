import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip} from 'recharts';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.changeTimeFrames = this.changeTimeFrames.bind(this)
        // this.state = { time: '1d' }
        this.handleTimeFrameSelect = this.handleTimeFrameSelect.bind(this)
    }

    componentDidMount() {
        this.props.receiveDay(`${this.props.ticker}`)
        // this.props.receiveWeek(`${this.props.ticker}`)
        this.props.receiveRealTimePrice(`${this.props.ticker}`)
        // this.props.receiveHistorical(`${this.props.ticker}`)
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            this.props.receiveDay(`${this.props.ticker}`);
            this.props.receiveWeek(`${this.props.ticker}`)
            this.props.receiveRealTimePrice(`${this.props.ticker}`)
            this.props.receiveHistorical(`${this.props.ticker}`)
        }
    }

    handleHover(e) {
        const ele = document.getElementById("real-time-price");
        ele.textContent = `$${e.activePayload[0].value}`
    }

    handleMouseLeave() {
        const ele = document.getElementById("real-time-price");
        ele.textContent=`$${this.props.price}`
    }

    changeTimeFrames(newFrame) {
        this.handleTimeFrameSelect(newFrame)
    }

    // ?????????? week and day data are reversed
    handleTimeFrameSelect(arg) {
        switch (arg) {
            case "1d":
                this.props.receiveDay(`${this.props.ticker}`)

                // data = data.filter(obj => {
                //     let oDate = obj.date.split(" ");
                //     let oday = oDate[0].split("-");
                //     return oday[2] === dateFix;
                // });
                break;
            case "1w":
                this.props.receiveWeek(`${this.props.ticker}`)
                break;
            case "1m":
                this.props.receiveHistorical(`${this.props.ticker}`)
                // data = this.props.historicalPrices.slice(-31)
                break
            case "3m":
                this.props.receiveHistorical(`${this.props.ticker}`)
                // data = this.props.historicalPrices.slice(-93)
                break
            // case "1y":
            //     this.props.receiveHistorical(`${this.props.ticker}`)
            //     // data = this.props.historicalPrices.slice(-261)
            //     break
            case "1y":
                this.props.receiveHistorical(`${this.props.ticker}`)
                // data = this.props.historicalPrices.slice(-261)
                break
            case "5y":
                this.props.receiveHistorical(`${this.props.ticker}`)
                // data = this.props.historicalPrices;
                // data = data.reverse();
                // data = data.filter((ele, idx) => {
                //     return idx % 5 === 0;
                // });
                // data = data.reverse()
                break
        }
    }
    
    render() {
        let data;
        let d = new Date();
        let date = d.getDate().toString();
        let dateFix = date.padStart(2, "0");
        if (this.props.graphPrices.length === 0) {
            return null;
        } else {
            data = this.props.graphPrices
        }

        const renderLineChart = (
            <LineChart 
                width={800} 
                height={400} 
                data={data} 
                onMouseOver={this.handleHover} 
                onMouseLeave={this.handleMouseLeave}>
                <Line type="monotone" dataKey="close" stroke="#21ce99"/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <YAxis domain={['dataMin', 'dataMax']}/>
                <Tooltip />
            </LineChart>
        );
        // debugger
        return (
            <div className="graph-wrapper">
                {/* actual css variables google: dark mode css themes */}
                {/* custom tooltip Ronil's gh */}
                <li className="show-stock-price" id="real-time-price">${`${this.props.price}`}</li>
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