import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip } from 'recharts';
import Holidays from 'date-holidays';
import moment from 'moment';
import numeral from 'numeral';

function GraphMain(props) {
  const [time, setTime ] = useState("1d");
  const [premarket, setPremarket] = useState("")

  useEffect(() => {
    getOnlyNecessaryTimeFrames();
  }, [])

  function changeTimeFrames(newFrame) {
    setTime(newFrame);
    changeTimeFrameUnderline(newFrame)
  }

  function changeTimeFrameUnderline(timeFrame) {
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

  function handleHover(e) {
    if (!e.activePayload) return null;

    let rtv = document.getElementById("current-valuation");
    let diff = document.getElementById("main-diff");
    let perc = document.getElementById("main-perc");
    let startPrice = document.getElementById("main-starting-price");

    if (!!startPrice.textContent) {
      let hoverPrice = numeral(e.activePayload[0].payload.valuation).format('$0,0.00');
      let hoverDiff = e.activePayload[0].payload.valuation - parseInt(startPrice.textContent);
      let hoverPerc = (e.activePayload[0].payload.valuation - parseInt(startPrice.textContent)) / parseInt(startPrice.textContent);
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

  function handleMouseLeave() {
    let rtv = document.getElementById("current-valuation");
    let startPrice = document.getElementById("main-starting-price");
    let diff = document.getElementById("main-diff");
    let perc = document.getElementById("main-perc");

    let totalEquity = 0;
    props.tickers.forEach((ticker, idx) => {
      let value = props.holdings[ticker].quantity * props.price[ticker];
      totalEquity += value;
    });

    if (!!startPrice.textContent) {
      let currentPrice = totalEquity + props.buyingPower;
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
  
  function customToolTip(e) {
    let formatted
    let dayTime
    if (!!e.label) {
      let t = e.label.split("T");
      let tt = t[1].split(":");
      let makeTen = 10 - parseInt(tt[1][1]);
      dayTime = moment(e.label).add(makeTen, "minutes");
    }
    if (time === "1d") {
      formatted = moment(dayTime).format('LT') + ' ET';
    } else if (time === "1w") {
      formatted = moment(dayTime).format('LLL');
    } else {
      formatted = moment(e.label).format('MMM Do, YYYY');
    }
    return (
      <div className="custom-tooltip">{formatted}</div>
    )
  }

  function getOnlyNecessaryTimeFrames() {
    let snapshots = props.snapshots;
    if (Object.values(snapshots).length === 0) return;

    let timeFrames = Array.from(document.getElementsByClassName("stock-time-frame"));
    let earliestSnap = moment(Object.values(snapshots)[0].created_at);

    if (earliestSnap.isAfter(moment().subtract(1, 'days'))) {
      timeFrames[0].innerHTML = "All";
      let otherTimes = timeFrames.slice(1);
      otherTimes.forEach(time => {
          time.classList.add("hide");
      })
    } else if (earliestSnap.isAfter(moment().subtract(1, 'weeks'))) {
      timeFrames[1].innerHTML = "All";
      let otherTimes = timeFrames.slice(2);
      otherTimes.forEach(time => {
        time.classList.add("hide");
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

  function getOnlyDayEndPrice(data) {
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
    return newData
  }

  function filterGraphPrices() {
    let rightNow = new Date();
    let dayNum = rightNow.getDay();
    let marketOpen = moment(rightNow.toString().split(" ").slice(0, 4).join(" ") + " 09:30:00")
    if (marketOpen.isAfter(rightNow)) {
      setPremarket('Markets open at 9:30am EST')
    }

    let holidays = new Holidays('US');
    let hd = holidays.isHoliday(new Date());
    let data = props.snapshots;
    
    if (time === "1d" && (dayNum === 6 // Saturday
                                    || dayNum === 0 // Sunday
                                    || hd.type === 'public' 
                                    || hd.type === 'bank'
                                    || marketOpen.isAfter(rightNow))) {
      let mostRecentTradingDay = moment(props.snapshots[props.snapshots.length - 1].created_at)
      data = data.filter(obj => {
          return moment(obj.created_at).isSame(mostRecentTradingDay, 'day')
      })
    } else if (time === "1d") {
      data = data.filter(obj => moment(obj.created_at).isSame(rightNow, 'day'));
    } else if (time === "1w") {
      data = data.filter(obj => {
        let t = obj.created_at.split("T");
        let tt = t[1].split(":");
        let keep
        parseInt(tt[1]) >= 20 && parseInt(tt[1]) < 30 || parseInt(tt[1]) >= 50
          ? keep = true
          : keep = false;
        let limit = moment().subtract(1, 'weeks')
        return moment(obj.created_at).isAfter(limit) && keep;
      });
    } else if (time === "1m") {
      let limit = moment().subtract(1, 'months')
      data = data.filter((obj, idx) => {
        return moment(obj.created_at).isAfter(limit);
      });
      data = getOnlyDayEndPrice(data);
    } else if (time === "3m") {
      let limit = moment().subtract(3, 'months')
      data = data.filter(obj => {
          return moment(obj.created_at).isAfter(limit);
      });
      data = getOnlyDayEndPrice(data);
    } else if (time === "1y") {
      let limit = moment().subtract(1, 'years')
      data = data.filter(obj => {
          return moment(obj.created_at).isAfter(limit);
      });
      data = getOnlyDayEndPrice(data);
    } else if (time === "5y") {
      let limit = moment().subtract(5, 'years')
      data = data.filter((obj, idx) => {
          return moment(obj.created_at).isAfter(limit)
      });
      data = getOnlyDayEndPrice(data);
    }
    return data
  }
 
  if (Object.keys(props.graphPrices).length !== Object.keys(props.price).length
    || props.buyingPower.length === 0) {
    return null
  }

  let data = filterGraphPrices();

  let totalEquity = 0;
  props.tickers.forEach((ticker, idx) => {
    if(props.holdings[ticker].quantity !== 0) {
      let value = props.holdings[ticker].quantity * props.price[ticker];
      totalEquity = totalEquity + value;
    }
  });

  let assets = totalEquity + props.buyingPower;
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

  let toolTipOffSet;
  time === '1w' ? toolTipOffSet = -70 : toolTipOffSet = -50;

  const renderLineChart = (
    <LineChart
      width={800}
      height={300}
      data={data}
      onMouseMove={handleHover}
      onMouseLeave={handleMouseLeave}>
      <Line type="linear" dataKey="valuation" stroke={color} dot={false} strokeWidth={2}/>
      <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true}/>
      <XAxis dataKey='created_at' hide={true} />
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
    <div>
      <h2 id="current-valuation" className="main-page-total-assets">
        {numeral(props.buyingPower + totalEquity).format('$0,0.00')}
      </h2>
      <div className="main-percentage-and-difference">
        <p className="main-page-difference" id="main-diff">{difference}</p>
        <p className="main-page-percentage" id="main-perc">{percentage}</p>
        <li className="hide" id="main-starting-price">{start}</li>
      </div>
      {renderLineChart}
      <ul className="stock-time-frames">
        <h2 onClick={() => changeTimeFrames("1d")} className="stock-time-frame 1d underlined">1D</h2>
        <h2 onClick={() => changeTimeFrames("1w")} className="stock-time-frame 1w">1W</h2>
        <h2 onClick={() => changeTimeFrames("1m")} className="stock-time-frame 1m">1M</h2>
        <h2 onClick={() => changeTimeFrames("3m")} className="stock-time-frame 3m">3M</h2>
        <h2 onClick={() => changeTimeFrames("1y")} className="stock-time-frame 1y">1Y</h2>
        <h2 onClick={() => changeTimeFrames("5y")} className="stock-time-frame 5y">All</h2>
      </ul>
      <p className="markets-closed-message">
        {premarket}
      </p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.entities.users[state.session.id],
    graphPrices: state.entities.graphPrices,
    price: state.entities.price,
    indexes: state.entities.indexes,
    indexPrices: state.entities.indexPrices,
    holdings: state.entities.holdings,
    buyingPower: state.entities.buyingPower,
    snapshots: state.entities.snapshots
  }
}

export default connect(mapStateToProps, null)(GraphMain);