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
        this.filterGraphPrices = this.filterGraphPrices.bind(this);
        this.state = {
            equityBalance: [],
            time: "1d"
        };
    }

    componentDidMount() {
        this.getOnlyNecessaryTimeFrames(this.props.snapshots);
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
        if (!e.activePayload) return null;

        let rtv = document.getElementById("current-valuation");
        let diff = document.getElementById("main-diff");
        let perc = document.getElementById("main-perc");
        let startPrice = document.getElementById("main-starting-price");

        if (!!startPrice.textContent) {
            let hoverPrice = numeral(e.activePayload[0].value).format('$0,0.00');
            let hoverDiff = e.activePayload[0].value - parseInt(startPrice.textContent);
            let hoverPerc = (e.activePayload[0].value - parseInt(startPrice.textContent)) / parseInt(startPrice.textContent);
            if (hoverDiff > 0) {
                hoverDiff = numeral(hoverDiff).format('$0,0.00');
                hoverPerc = numeral(hoverPerc).format('0.00%');
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
            let value = this.props.holdings[ticker].quantity * this.props.price[ticker][0].price;
            totalEquity += value;
        });

        if (!!startPrice.textContent) {
            let currentPrice = totalEquity + this.props.buyingPower;
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
            formatted = moment(e.label).format('LT') + ' ET'; 
        } else if (this.state.time === "1w") {
            formatted = moment(e.label).format('LLL');
        } else {
            formatted = moment(e.label).format('MMM Do, YYYY');
        }
        return (
            <div className="custom-tooltip">{formatted}</div>
        )
    }

    getOnlyNecessaryTimeFrames(snapshots) {
        if (Object.values(snapshots).length === 0) return
        let timeFrames = Array.from(document.getElementsByClassName("stock-time-frame"));
        let earliestSnap = moment(Object.values(snapshots)[0].created_at);

        if (earliestSnap.isAfter(moment().subtract(1, 'days'))) {
            timeFrames[0].innerHTML = "All";
            let otherTimes = timeFrames.slice(1);
            otherTimes.forEach(time => {
                time.classList.add("hide")
            })
        } else if (earliestSnap.isAfter(moment().subtract(1, 'weeks'))) {
            timeFrames[1].innerHTML = "All";
            let otherTimes = timeFrames.slice(2);
            otherTimes.forEach(time => {
                time.classList.add("hide")
            })
        } else if (earliestSnap.isAfter(moment().subtract(1, 'months'))) {
            timeFrames[2].innerHTML = "All";
            let otherTimes = timeFrames.slice(3);
            otherTimes.forEach(time => {
                time.classList.add("hide")
            })
        } else if (earliestSnap.isAfter(moment().subtract(3, 'months'))) {
            timeFrames[3].innerHTML = "All";
            let otherTimes = timeFrames.slice(4);
            otherTimes.forEach(time => {
                time.classList.add("hide")
            })
        } else if (earliestSnap.isAfter(moment().subtract(1, 'years'))) {
            timeFrames[4].innerHTML = "All";
            let otherTimes = timeFrames.slice(5);
            otherTimes.forEach(time => {
                time.classList.add("hide")
            })
        }
    }

    filterGraphPrices(data) {
        let pricePojo = this.props.graphPrices;
        data = Object.values(this.props.snapshots)

        if (this.state.time === "1d") {
            data = []
            let allPrices = [];
            Object.keys(pricePojo).forEach(key => {
                allPrices.push([key, pricePojo[key]])
            })
            let i = 0;
            while (i < allPrices[0][1].length) {
                let allHoldingsPresent = true;
                let close = 0;
                allPrices.forEach(arr => {
                    if (arr[1][i].close) {
                        close += arr[1][i].close * this.props.holdings[arr[0]].quantity;
                    } else {
                        allHoldingsPresent = false;
                    }
                })
                close += this.props.buyingPower;
                if (i % 5 === 0 && allHoldingsPresent) {
                    data.push({ close,
                        minute: allPrices[0][1][i]['minute'],
                        date: allPrices[0][1][i]['date'],
                    })
                }
                i++;
            }
        } else if (this.state.time === "1w") {
            let limit = moment().subtract(1, 'weeks')
            data = data.filter((obj, idx) => {
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "1m") {
            let limit = moment().subtract(1, 'months')
            data = data.filter((obj, idx) => {
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "3m") {
            let limit = moment().subtract(3, 'months')
            data = data.filter(obj => {
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "1y") {
            let limit = moment().subtract(1, 'years')
            data = data.filter(obj => {
                return moment(obj.created_at).isAfter(limit);
            });
        } else if (this.state.time === "5y") {
            let limit = moment().subtract(5, 'years')
            data = data.filter((obj, idx) => {
                return moment(obj.created_at).isAfter(limit)
            });
        }
        return data
    }

    render() {  
        if (Object.keys(this.props.graphPrices).length !== Object.keys(this.props.price).length
            || this.props.buyingPower.length === 0) {
            return null
            }

        let data = this.filterGraphPrices(this.props.graphPrices)

        let totalEquity = 0;
        this.props.tickers.forEach((ticker, idx) => {
            if(this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker][0].price;
                totalEquity = totalEquity + value;
            }
        });

        let assets = totalEquity + this.props.buyingPower;
        let difference;
        let percentage;
        let start;
        let color;
        let docBody = document.body;

        if (data[0]) {
            start = data[0].close;
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

            if (data[0] !== undefined && data[0].close > data.slice(-1)[0].close) {
                docBody.setAttribute("data-trend", "down");
                color = '#f45531';
            } else {
                docBody.setAttribute("data-trend", "up");
                color = '#21ce99';
            }
        }

        let toolTipOffSet;
        this.state.time === '1w' ? toolTipOffSet = -70 : toolTipOffSet = -50;

        const renderLineChart = (
            <LineChart
                width={800}
                height={300}
                data={data}
                onMouseMove={this.handleHover}
                onMouseLeave={this.handleMouseLeave}>
                <Line type="linear" dataKey="close" stroke={color} dot={false} strokeWidth={2}/>
                <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
                <XAxis dataKey='created_at' hide={true} />
                <Tooltip
                    position={{ y: 0 }}
                    offset={toolTipOffSet}
                    isAnimationActive={false}
                    content={this.customToolTip}
                    wrapperStyle={{ top: -15 }}
                />
            </LineChart>
        );

        return (
            <div>
                <h2 id="current-valuation" className="main-page-total-assets">
                    {numeral(this.props.buyingPower + totalEquity).format('$0,0.00')}
                </h2>
                <div className="main-percentage-and-difference">
                    <p className="main-page-difference" id="main-diff">{difference}</p>
                    <p className="main-page-percentage" id="main-perc">{percentage}</p>
                    <li className="hide" id="main-starting-price">{start}</li>
                </div>
                {renderLineChart}
                <ul className="stock-time-frames">
                    <h2 onClick={() => this.changeTimeFrames("1d")} className="stock-time-frame 1d underlined">1D</h2>
                    <h2 onClick={() => this.changeTimeFrames("1w")} className="stock-time-frame 1w">1W</h2>
                    <h2 onClick={() => this.changeTimeFrames("1m")} className="stock-time-frame 1m">1M</h2>
                    <h2 onClick={() => this.changeTimeFrames("3m")} className="stock-time-frame 3m">3M</h2>
                    <h2 onClick={() => this.changeTimeFrames("1y")} className="stock-time-frame 1y">1Y</h2>
                    <h2 onClick={() => this.changeTimeFrames("5y")} className="stock-time-frame 5y">All</h2>
                </ul>
            </div>
        )
    }
}

export default GraphMain