import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip} from 'recharts';
import moment from 'moment'

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.changeTimeFrames = this.changeTimeFrames.bind(this);
        this.handleFetch = this.handleFetch.bind(this);
        this.state = { 
            time: '1d',
        };
    }

    componentDidMount() {
        this.props.receiveDay(`${this.props.ticker}`)
    }

    componentDidUpdate(previousProps) {
        if (previousProps.ticker !== this.props.ticker) {
            this.changeTimeFrames("1d")
            this.props.receiveDay(`${this.props.ticker}`);
        }
    }

    changeTimeFrameUnderline(timeFrame) {
        let lis = Array.prototype.slice.call(document.getElementsByClassName("stock-time-frame"))
        lis.forEach((li, idx) => {
            let liClassList = Array.prototype.slice.call(li.classList)
            li.classList.remove("underlined")
            if(liClassList.includes(timeFrame)) {
                li.classList.add("underlined")
            }
        })
    }

    handleHover(e) {
        const ele = document.getElementById("real-time-price");
        ele.textContent = `$${e.activePayload[0].value.toFixed(2)}`;
    }

    handleMouseLeave() {
        const ele = document.getElementById("real-time-price");
        let symbol = this.props.ticker;
        ele.textContent = `$${this.props.price[symbol].price.toFixed(2)}`;
    }

    changeTimeFrames(newFrame) {
        this.setState({ time: newFrame });
        this.handleFetch(newFrame);
        this.changeTimeFrameUnderline(newFrame)
    }

    handleFetch(time) {
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
        if (this.props.price[this.props.ticker] === undefined) return null;
        if (this.props.graphPrices.length === 0) return null;
        
        let data = this.props.graphPrices;
        data = data.slice()
        let d = new Date();
        // console.log(moment(d).isSame('2020-04-04', 'day'))
        let day = d.getDay();
        let isWeekend = (day === 6) || (day === 0);  
        let date = d.getDate().toString();
        let dateFix = date.padStart(2, "0");
        if (this.state.time === "1d" && !isWeekend) {
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSame(d, 'day')
                // let oday = oDate[0].split("-");
                // return oday[2] === dateFix;
            })
            data = data.slice(1);
            data = data.reverse();
        } else if (this.state.time === "1d" && isWeekend) {
            data = data.slice(0, 79);
            data = data.reverse()
        } else if (this.state.time === "1w") {
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                let oday = oDate[0].split("-");
                return oday[2] === dateFix;
            })
            data = data.slice(3);
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
                <Line type="monotone" dataKey="close" stroke={color} dot={false}/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <XAxis dataKey='date' hide={true}/>
                <Tooltip />
            </LineChart>
        );
        
        return (
            <div className="graph-wrapper">
                <li className="show-stock-price" id="real-time-price">${`${this.props.price[this.props.ticker].price.toFixed(2)}`}</li>
                {renderLineChart}
                <ul className="stock-time-frames">
                    <li onClick={() => this.changeTimeFrames("1d")} className="stock-time-frame 1d underlined">1D</li>
                    <li onClick={() => this.changeTimeFrames("1w")} className="stock-time-frame 1w">1W</li>
                    <li onClick={() => this.changeTimeFrames("1m")} className="stock-time-frame 1m">1M</li>
                    <li onClick={() => this.changeTimeFrames("3m")} className="stock-time-frame 3m">3M</li>
                    <li onClick={() => this.changeTimeFrames("1y")} className="stock-time-frame 1y">1Y</li>
                    <li onClick={() => this.changeTimeFrames("5y")} className="stock-time-frame 5y">5Y</li>
                </ul>
            </div>
        )
    }
}

export default ShowPageGraph