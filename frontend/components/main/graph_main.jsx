import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';
import moment from 'moment';
import numeral from 'numeral';

class GraphMain extends React.Component {
    constructor(props) {
        super(props);
        this.changeTimeFrames = this.changeTimeFrames.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.customToolTip = this.customToolTip.bind(this);
        this.state = {
            equityBalance: [],
            time: "1d"
        };
    }

    changeTimeFrames(newFrame) {
        this.setState({ time: newFrame });
        this.changeTimeFrameUnderline(newFrame)
    }

    changeTimeFrameUnderline(timeFrame) {
        let lis = Array.prototype.slice.call(document.getElementsByClassName("stock-time-frame"))
        lis.forEach((li, idx) => {
            let liClassList = Array.prototype.slice.call(li.classList)
            li.classList.remove("underlined")
            if (liClassList.includes(timeFrame)) {
                li.classList.add("underlined")
            }
        })
    }

    handleHover(e) {
        if (e.activePayload === undefined) return null;
        if (e.activePayload === null) return null;

        const ele = document.getElementById("current-valuation");
        let hoverPrice = numeral(e.activePayload[0].value).format('$0,0.00');
        ele.textContent = hoverPrice;
    }

    handleMouseLeave() {
        const ele = document.getElementById("current-valuation");
        let totalEquity = 0;
        this.props.tickers.forEach((ticker, idx) => {
            if (this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        });
        let currentPrice = numeral(totalEquity + this.props.cash).format('$0,0.00');
        ele.textContent = currentPrice;
    }
    
    customToolTip(e) {
        let formatted
        if (this.state.time === "1d") {
            formatted = moment(e.label).format('LT'); 
        } else if (this.state.time === "1w") {
            formatted = moment(e.label).format('LLL');
        } else {
            formatted = moment(e.label).format('L');
        }
        return (
            <div className="custom-tooltip">{formatted}</div>
        )
    }

    render() {  
        if (this.props.snapshots.length === 0) return null;
        
        let totalEquity = 0;
        this.props.tickers.forEach((ticker, idx) => {
            if(this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        });

        let data = Object.values(this.props.snapshots)
        let d = new Date();
        let day = d.getDay();
        let isWeekend = (day === 6) || (day === 0);
        if (this.state.time === "1d" && !isWeekend) {
            data = data.filter(obj => {
                return moment(obj.created_at).isSame(d, 'day')
            })
        } else if (this.state.time === "1d" && isWeekend) {
            let friday;
            day === 6 ? friday = moment().subtract(1, 'days') 
            : friday = moment().subtract(2, 'days')
            data = data.filter(obj => {
                return moment(obj.created_at).isSame(friday, 'day')
            })
        } else if (this.state.time === "1w") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'weeks')
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "1m") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'months')
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "3m") {
            data = data.filter(obj => {
                let limit = moment().subtract(3, 'months')
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "1y") {
            data = data.filter(obj => {
                let limit = moment().subtract(1, 'years')
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "5y") {
            data = data.filter((obj, idx) => {
                let limit = moment().subtract(5, 'years')
                return moment(obj.created_at).isAfter(limit)
            });    
        }

        let assets = totalEquity + this.props.cash;
        let difference;
        let percentage;
        if (JSON.stringify(this.props.snapshots) !== '{}') {
            difference = assets - data[0].valuation;
            percentage =  difference / data[0].valuation;
            if (difference > 0) {
                difference = numeral(difference).format('$0,0.00')
                percentage = numeral(percentage).format('0.00%')
                difference = "+" + difference.toString();
                percentage = "+" + difference.toString();
            } else {
                percentage = `(${numeral(percentage).format('0.00%')})`
                difference = numeral(difference).format('$0,0.00')
            }
        }


        let color = '#21ce99'

        const renderLineChart = (
            <LineChart
                width={800}
                height={400}
                data={data}
                onMouseMove={this.handleHover}
                onMouseLeave={this.handleMouseLeave}>
                <Line type="monotone" dataKey="valuation" stroke={color} dot={false} />
                <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <XAxis dataKey='created_at' hide={true} />
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
            <div>
                <h2 id="current-valuation" className="main-page-total-assets">
                    {numeral(this.props.cash + totalEquity).format('$0,0.00')}
                </h2>
                <div className="main-percentage-and-difference">
                    <p className="main-page-difference">{difference}</p>
                    <p className="main-page-percentage">{percentage}</p>
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

export default GraphMain