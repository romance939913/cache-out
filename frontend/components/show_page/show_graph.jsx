import React from 'react';
import { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip} from 'recharts';
import moment from 'moment';
import numeral from 'numeral';
import Odometer from 'react-odometerjs';
import { connect } from 'react-redux';
import script from './odometer'

function ShowPageGraph(props) {
    const [time, setTime] = useState('1d')
    // const [price, setPrice] = useState(props.price[props.ticker])

    useEffect(() => {
        setTime('1d')
        const script = document.createElement("script");
        // script.async = true;
        script.src = "https://raw.githubusercontent.com/HubSpot/odometer/v0.4.6/odometer.min.js";
        document.head.appendChild(script);
    }, [])

    function changeTimeFrameUnderline(timeFrame) {
        let lis = Array.prototype.slice.call(document.getElementsByClassName("stock-time-frame"))
        lis.forEach((li, idx) => {
            let liClassList = Array.prototype.slice.call(li.classList)
            li.classList.remove("underlined")
            if(liClassList.includes(timeFrame)) {
                li.classList.add("underlined")
            }
        })
    }

    function handleHover(e) {
        if (!e.activePayload) return null;
        
        const rtp = document.getElementById("rtp")
        const diff = document.getElementById("show-diff");
        const perc = document.getElementById("show-perc");
        const startingprice = document.getElementById("starting-price");

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
        rtp.innerHTML = numeral(e.activePayload[0].value).format('$0,0.00')
        // setPrice(e.activePayload[0].value)
    }

    function handleMouseLeave() {
        let startPrice = document.getElementById("starting-price");
        let diff = document.getElementById("show-diff");
        let perc = document.getElementById("show-perc");
        let start;
        let difference;
        let percentage;

        if (startPrice.textContent) {
            start = startPrice.textContent;
            difference = props.price[props.ticker] - start;
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
    
            rtp.textContent = numeral(props.price[props.ticker]).format('$0,0.00');
            diff.textContent = difference;
            perc.textContent = `(${percentage})`;
            // setPrice(props.price[props.ticker])
        }
    }

    function changeTimeFrames(newFrame) {
        setTime(newFrame)
        changeTimeFrameUnderline(newFrame)
    }

    function customToolTip(e) {
        let formatted
        if (time === "1d") {
            formatted = moment(e.label).format('LT') + ' EST';
        } else if (time === "1w") {
            formatted = moment(e.label).format('LLL');
        } else {
            formatted = moment(e.label).format("MMM Do, YYYY");
        }
        return (
            <div className="custom-tooltip">{formatted}</div>
        )
    }
    
    let data;
    if (time === '1d') {
        data = props.graphPrices['Day'];
    } else if (time === '1w'){
        data = props.graphPrices['Week'];
    } else {
        data = props.graphPrices['Historical'];
    }

    let d = new Date();
    let day = d.getDay();
    let isWeekend = (day === 6) || (day === 0);  
    if (time === "1d" && !isWeekend) {
        let dayData = data.filter(obj => {
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isSame(d, 'day')
        })
        dayData = dayData.slice();
        dayData = dayData.reverse();
        if (dayData.length === 0) {
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                let yesterday = moment(d).subtract(1, 'day')
                return moment(oDate[0]).isSame(yesterday, 'day')
            })
            data = data.slice();
            data = data.reverse();
        } else {
            data = dayData;
        }
    } else if (time === "1d" && isWeekend) {
        data = data.slice(0, 79);
        data = data.reverse()
    } else if (time === "1w") {
        data = data.filter(obj => {
            let limit = moment().subtract(1, 'weeks')
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isAfter(limit);
        })
        data = data.slice();
        data = data.reverse();
    } else if (time === "1m") {
        data = data.filter(obj => {
            let limit = moment().subtract(1, 'months')
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isSameOrAfter(limit);
        })
        data = data.reverse();
    } else if (time === "3m") {
        data = data.filter(obj => {
            let limit = moment().subtract(3, 'months')
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isSameOrAfter(limit);
        })
        data = data.reverse();
    } else if (time === "1y") {
        data = data.filter(obj => {
            let limit = moment().subtract(1, 'years')
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isSameOrAfter(limit);
        })
        data = data.reverse();
    } else if (time === "5y") {
        data = data.filter((obj, idx) => {
            let limit = moment().subtract(5, 'years')
            let oDate = obj.date.split(" ");
            return moment(oDate[0]).isSameOrAfter(limit) && idx % 5 === 0;
        })
        data = data.reverse();
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

    let toolTipOffSet;
    time === '1w' ? toolTipOffSet = -70 : toolTipOffSet = -50;

    let dayDifference;
    let percentage;
    let start;
    if (data[0]) {
        start = data[0].close
        dayDifference = props.price[props.ticker] - start;
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
            height={300} 
            data={data} 
            onMouseMove={handleHover} 
            onMouseLeave={handleMouseLeave}>
            <Line type="linear" dataKey="close" stroke={color} dot={false} strokeWidth={2}/>
            <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
            <XAxis dataKey='date' hide={true}/>
            <Tooltip
                position={{ y: 0 }}
                offset={toolTipOffSet}
                isAnimationActive={false}
                content={customToolTip}
                wrapperStyle={{ top: -15 }}
            />
        </LineChart>
    );
    
    return (
        <div className="graph-wrapper">
            <h3 className="show-company-name">{props.profile.companyName}</h3>
            {/* <h3 className="odometer show-real-time-price">1234</h3> */}
            <p className="show-real-time-price" id="rtp">{numeral(props.price[props.ticker]).format('$0,0.00')}</p>
            <div className="show-percentage-and-difference">
                <li className="show-page-difference" id="show-diff">{dayDifference}</li>
                <li className="show-page-percentage" id="show-perc">{percentage}</li>
                <li className="hide" id="starting-price">{start}</li>
            </div>
            {renderLineChart}
            <ul className="stock-time-frames">
                <h2 onClick={() => changeTimeFrames("1d")} className="stock-time-frame 1d underlined">1D</h2>
                <h2 onClick={() => changeTimeFrames("1w")} className="stock-time-frame 1w">1W</h2>
                <h2 onClick={() => changeTimeFrames("1m")} className="stock-time-frame 1m">1M</h2>
                <h2 onClick={() => changeTimeFrames("3m")} className="stock-time-frame 3m">3M</h2>
                <h2 onClick={() => changeTimeFrames("1y")} className="stock-time-frame 1y">1Y</h2>
                <h2 onClick={() => changeTimeFrames("5y")} className="stock-time-frame 5y">5Y</h2>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id],
        profile: state.entities.profile,
        graphPrices: state.entities.graphPrices,
        price: state.entities.price
    }
}

export default connect(mapStateToProps, null)(ShowPageGraph)