import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip} from 'recharts';
import moment from 'moment';
import numeral from 'numeral';

class ShowPageGraph extends React.Component {
    constructor(props) {
        super(props);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.changeTimeFrames = this.changeTimeFrames.bind(this);
        this.customToolTip = this.customToolTip.bind(this)
        this.state = { 
            time: '1d',
        };
    }

    componentDidMount() {
        this.props.clearGraphPrices();
        this.props.receiveDay(`${this.props.ticker}`);
        this.props.receiveWeek(`${this.props.ticker}`);
        this.props.receiveHistorical(`${this.props.ticker}`);
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
        if (e.activePayload === undefined) return null;
        if (e.activePayload === null) return null;
        
        const rtp = document.getElementById("real-time-price");
        const diff = document.getElementById("show-diff");
        const perc = document.getElementById("show-perc");
        const startingprice = document.getElementById("starting-price");

        let hoverPrice = numeral(e.activePayload[0].value).format('$0,0.00');
        let hoverDiff = e.activePayload[0].value - startingprice.textContent
        let hoverPerc = hoverDiff / startingprice.textContent

        if (hoverDiff > 0) {
            hoverDiff = numeral(hoverDiff).format('$0,0.00')
            hoverPerc = numeral(hoverPerc).format('0.00%')
            hoverDiff = "+" + hoverDiff.toString();
            hoverPerc = "+" + hoverPerc.toString();
        } else {
            hoverDiff = numeral(hoverDiff).format('$0,0.00')
            hoverPerc = numeral(hoverPerc).format('0.00%')
        }
        
        diff.textContent = hoverDiff;
        perc.textContent = `(${hoverPerc})`;
        rtp.textContent = hoverPrice;
    }

    handleMouseLeave() {
        let rtp = document.getElementById("real-time-price");
        let startPrice = document.getElementById("starting-price");
        let diff = document.getElementById("show-diff");
        let perc = document.getElementById("show-perc");
        let start;
        let difference;
        let percentage;

        if (startPrice.textContent) {
            start = startPrice.textContent;
            difference = this.props.price[this.props.ticker].price - start;
            percentage = difference / start;
            if(difference > 0) {
                difference = numeral(difference).format('$0,0.00');
                percentage = numeral(percentage).format('0.00%');
                difference = "+" + difference.toString();
                percentage = "+" + percentage.toString();
            } else {
                difference = numeral(difference).format('$0,0.00');
                percentage = numeral(percentage).format('0.00%')
            }
    
            rtp.textContent = numeral(this.props.price[this.props.ticker].price).format('$0,0.00');
            diff.textContent = difference;
            perc.textContent = `(${percentage})`;
        }
    }

    changeTimeFrames(newFrame) {
        this.setState({ time: newFrame });
        this.changeTimeFrameUnderline(newFrame)
    }

    customToolTip(e) {
        let formatted
        if (this.state.time === "1d") {
        formatted = moment(e.label).format('LT');
        } else if (this.state.time === "1w") {
            formatted = moment(e.label).format('LLL');
        } else {
            formatted = moment(e.label).format("MMM Do, YYYY");
        }
        return (
            <div className="custom-tooltip">{formatted}</div>
        )
    }

    
    render() {
        if (this.props.graphPrices['Week'] === undefined) return null;
        if (this.props.graphPrices['Day'] === undefined) return null;
        if (this.props.graphPrices['Historical'] === undefined) return null;
        if (this.props.price[this.props.ticker] === undefined) return null;
        
        let data;
        if (this.state.time === '1d') {
            data = this.props.graphPrices['Day'];
        } else if (this.state.time === '1w'){
            data = this.props.graphPrices['Week'];
        } else {
            data = this.props.graphPrices['Historical']
        }

        let d = new Date();
        let day = d.getDay();
        let isWeekend = (day === 6) || (day === 0);  
        if (this.state.time === "1d" && !isWeekend) {
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSame(d, 'day')
            })
            data = data.slice();
            data = data.reverse();
        } else if (this.state.time === "1d" && isWeekend) {
            data = data.slice(0, 79); // takes last day (friday) data
            data = data.reverse()
        } else if (this.state.time === "1w") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'weeks')
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isAfter(limit);
            })
            data = data.slice();
            data = data.reverse();
        } else if (this.state.time === "1m") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'months')
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSameOrAfter(limit);
            })
        } else if (this.state.time === "3m") {
            data = data.filter(obj => {
                let limit = moment().subtract(3, 'months')
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSameOrAfter(limit);
            })
        } else if (this.state.time === "1y") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'years')
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSameOrAfter(limit);
            })
        } else if (this.state.time === "5y") {
            data = data.filter((obj, idx) => {
                let limit = moment().subtract(5, 'years')
                let oDate = obj.date.split(" ");
                return moment(oDate[0]).isSameOrAfter(limit) && idx % 5 === 0;
            })
        }

        let color;
        let docBody = document.body;
        if (data[0] !== undefined && data[0].close > data.slice(-1)[0].close) {
            docBody.setAttribute("data-trend", "down");
            color = '#f45531';
        } else {
            docBody.setAttribute("data-trend", "up");
            color = '#21ce99';
        }

        let dayDifference;
        let percentage;
        let start;
        if (data[0]) {
            start = data[0].close
            dayDifference = this.props.price[this.props.ticker].price - start;
            percentage = dayDifference / start;
            if (dayDifference > 0) {
                dayDifference = numeral(dayDifference).format('$0,0.00')
                percentage = numeral(percentage).format('0.00%')
                dayDifference = "+" + dayDifference.toString();
                percentage = `(+${percentage.toString()})`;
            } else {
                percentage = `(${numeral(percentage).format('0.00%')})`
                dayDifference = numeral(dayDifference).format('$0,0.00')
            }
        }

        const renderLineChart = (
            <LineChart 
                width={800} 
                height={350} 
                data={data} 
                onMouseMove={this.handleHover} 
                onMouseLeave={this.handleMouseLeave}>
                <Line type="monotone" dataKey="close" stroke={color} dot={false}/>
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <XAxis dataKey='date' hide={true}/>
                <Tooltip
                    position={{ y: 0 }}
                    offset={-50}
                    isAnimationActive={false}
                    content={this.customToolTip}
                    wrapperStyle={{ top: -15 }}
                />
            </LineChart>
        );

        
        return (
            <div className="graph-wrapper">
                <li className="show-stock-price" id="real-time-price">{numeral(this.props.price[this.props.ticker].price).format('$0,0.00')}</li>
                <div className="show-percentage-and-difference">
                    <li className="show-page-difference" id="show-diff">{dayDifference}</li>
                    <li className="show-page-percentage" id="show-perc">{percentage}</li>
                    <li className="display-none" id="starting-price">{start}</li>
                </div>
                {renderLineChart}
                <ul className="stock-time-frames">
                    <h2 onClick={() => this.changeTimeFrames("1d")} className="stock-time-frame 1d underlined">1D</h2>
                    <h2 onClick={() => this.changeTimeFrames("1w")} className="stock-time-frame 1w">1W</h2>
                    <h2 onClick={() => this.changeTimeFrames("1m")} className="stock-time-frame 1m">1M</h2>
                    <h2 onClick={() => this.changeTimeFrames("3m")} className="stock-time-frame 3m">3M</h2>
                    <h2 onClick={() => this.changeTimeFrames("1y")} className="stock-time-frame 1y">1Y</h2>
                    <h2 onClick={() => this.changeTimeFrames("5y")} className="stock-time-frame 5y">5Y</h2>
                </ul>
            </div>
        )
    }
}

export default ShowPageGraph