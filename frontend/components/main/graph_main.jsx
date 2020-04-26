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
            li.classList.remove("green")
            if (liClassList.includes(timeFrame)) {
                li.classList.add("underlined")
                li.classList.add("green")
            }
        })
    }

    handleHover(e) {
        if (e.activePayload === undefined) return null;
        if (e.activePayload === null) return null;

        let rtv = document.getElementById("current-valuation");
        let diff = document.getElementById("main-diff");
        let perc = document.getElementById("main-perc");
        let startPrice = document.getElementById("main-starting-price");

        if (!!startPrice.textContent) {
            let hoverPrice = numeral(e.activePayload[0].value).format('$0,0.00');
            let hoverDiff = e.activePayload[0].value - startPrice.textContent;
            let hoverPerc = hoverDiff / startPrice.textContent;
            if (hoverDiff > 0) {
                hoverDiff = numeral(hoverDiff).format('$0,0.00')
                hoverPerc = numeral(hoverPerc).format('0.00%')
                hoverDiff = `+${hoverDiff.toString()}`;
                hoverPerc = `(+${hoverPerc.toString()})`;
            } else {
                hoverPerc = `(${numeral(hoverPerc).format('0.00%')})`;
                hoverDiff = numeral(hoverDiff).format('$0,0.00')
            }
    
            rtv.textContent = hoverPrice;
            diff.textContent = hoverDiff;
            perc.textContent = hoverPerc;
        }
    }

    handleMouseLeave() {
        let rtv = document.getElementById("current-valuation");
        let startPrice = document.getElementById("main-starting-price");
        let diff = document.getElementById("main-diff");
        let perc = document.getElementById("main-perc");

        let totalEquity = 0;
        this.props.tickers.forEach((ticker, idx) => {
            if (this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        });

        if (!!startPrice.textContent) {
            let currentPrice = totalEquity + this.props.cash;
            let currentDiff = currentPrice - startPrice.textContent;
            let currentPerc = currentDiff / startPrice.textContent;
    
            if (currentDiff > 0) {
                currentDiff = numeral(currentDiff).format('$0,0.00')
                currentPerc = numeral(currentPerc).format('0.00%')
                currentDiff = `+${currentDiff.toString()}`;
                currentPerc = `(+${currentPerc.toString()})`;
            } else {
                currentPerc = `(${numeral(currentPerc).format('0.00%')})`;
                currentDiff = numeral(currentDiff).format('$0,0.00')
            }
    
            rtv.textContent = numeral(currentPrice).format('$0,0.00');
            diff.textContent = currentDiff;
            perc.textContent = currentPerc;
        }
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
                return moment(obj.created_at).isSame(d, 'day') && moment(obj.created_at).isAfter('9:20:00 AM', 'time')
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
            let limit = moment().subtract(1, 'months')
            data = data.filter((obj, idx) => {
                return moment(obj.created_at).isAfter(limit);
            });
            let newData = [];
            data = data.forEach(obj => {
                if (newData.length === 0) {
                    newData.push(obj)
                } else {
                    if(moment(newData.slice(-1)[0].created_at).dayOfYear() === moment(obj.created_at).dayOfYear()) {
                        newData.pop();
                    }
                    newData.push(obj)
                }
            })
            data = newData;
        } else if (this.state.time === "3m") {
            let limit = moment().subtract(3, 'months')
            data = data.filter(obj => {
                return moment(obj.created_at).isAfter(limit);
            });
            let newData = [];
            data = data.forEach(obj => {
                if (newData.length === 0) {
                    newData.push(obj)
                } else {
                    if (moment(newData.slice(-1)[0].created_at).dayOfYear() === moment(obj.created_at).dayOfYear()) {
                        newData.pop();
                    }
                    newData.push(obj)
                }
            })
            data = newData;
        } else if (this.state.time === "1y") {
            let limit = moment().subtract(1, 'years')
            data = data.filter(obj => {
                return moment(obj.created_at).isAfter(limit);
            });
            let newData = [];
            data = data.forEach(obj => {
                if (newData.length === 0) {
                    newData.push(obj)
                } else {
                    if (moment(newData.slice(-1)[0].created_at).dayOfYear() === moment(obj.created_at).dayOfYear()) {
                        newData.pop();
                    }
                    newData.push(obj)
                }
            })
            data = newData;
        } else if (this.state.time === "5y") {
            let limit = moment().subtract(5, 'years')
            data = data.filter((obj, idx) => {
                return moment(obj.created_at).isAfter(limit)
            });    
            let newData = [];
            data = data.forEach(obj => {
                if (newData.length === 0) {
                    newData.push(obj)
                } else {
                    if (moment(newData.slice(-1)[0].created_at).dayOfYear() === moment(obj.created_at).dayOfYear()) {
                        newData.pop();
                    }
                    newData.push(obj)
                }
            })
            data = newData;
        }

        let assets = totalEquity + this.props.cash;
        let difference;
        let percentage;
        let start;
        let color;
        let docBody = document.body;
        if (data[0]) {
            start = data[0].valuation;
            difference = assets - start;
            percentage =  difference / start;
            if (difference > 0) {
                difference = numeral(difference).format('$0,0.00');
                percentage = numeral(percentage).format('0.00%');
                difference = `(+${difference.toString()})`;
                percentage = `+${percentage.toString()}`;
            } else {
                percentage = `(${numeral(percentage).format('0.00%')})`
                difference = numeral(difference).format('$0,0.00')
            }

            if (data[0] !== undefined && data[0].valuation > data.slice(-1)[0].valuation) {
                docBody.setAttribute("data-trend", "down");
                color = '#f45531';
            } else {
                docBody.setAttribute("data-trend", "up");
                color = '#21ce99';
            }
        }

        const renderLineChart = (
            <LineChart
                width={800}
                height={300}
                data={data}
                onMouseMove={this.handleHover}
                onMouseLeave={this.handleMouseLeave}>
                <Line type="monotone" dataKey="valuation" stroke={color} dot={false} />
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
                    <p className="main-page-difference" id="main-diff">{difference}</p>
                    <p className="main-page-percentage" id="main-perc">{percentage}</p>
                    <li className="display-none" id="main-starting-price">{start}</li>
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