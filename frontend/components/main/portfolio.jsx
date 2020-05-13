import React from 'react';
import { Link } from 'react-router-dom'
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from 'recharts';
import numeral from 'numeral'
import moment from 'moment';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: this.props.currentUser.id
        }
    }

    componentDidMount() {
        this.props.tickers.forEach((ticker, idx) => {
            this.props.receiveMultipleDays(ticker)
        })
    }
    
    render() {
        let tickerArr = [];
        let d = new Date();
        let day = d.getDay();
        let isWeekend = (day === 6) || (day === 0);

        this.props.tickers.forEach((ticker, idx) => {
            if (this.props.holdings[ticker].quantity !== 0) {
                let data;
                let dayDifference;
                let percentage;
                let color;
                let renderLineChart
                if (Object.keys(this.props.graphPrices).length !== this.props.tickers.length) {
                    data = []
                } else {
                    data = this.props.graphPrices[ticker]

                    data = data.filter(obj => {
                        let oDate = obj.date.split(" ");
                        return moment(oDate[0]).isSame(d, 'day')
                    })

                    data = data.slice();
                    data = data.reverse();

                    if (!isWeekend && data[0]) {
                        dayDifference = data.slice(-1)[0].close - data[0].close;
                        percentage = dayDifference / data[0].close;
                        percentage = numeral(percentage).format('0.00%')
                    }

                    if (dayDifference >= 0) {
                        color = '#21ce99'
                    } else {
                        color = '#f45531'
                    }
    
                    renderLineChart = (
                        <LineChart
                            width={100}
                            height={50}
                            data={data}>
                            <Line type="linear" dataKey="close" stroke={color} dot={false} />
                            <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true} />
                            <XAxis dataKey='date' hide={true} />
                        </LineChart>
                    );
                }


                tickerArr.push(<Link
                    to={`/show/${ticker}`}
                    key={idx}>
                    <li key={idx} className="holding-portfolio-li">
                        <div className="portfolio-ele portfolio-ele-left">
                            <h1>{ticker}</h1>
                            <p className="portfolio-ele-small">{numeral(this.props.holdings[ticker].quantity).format('0,0')} shares</p>
                        </div>
                        <div className="chart-thumbnail">
                            {renderLineChart}
                        </div>
                        <div className="portfolio-ele portfolio-ele-right">
                            <p>{numeral(this.props.price[ticker].price).format('$0,0.00')}</p>
                            <p className="portfolio-ele-small">{percentage}</p>
                        </div>
                    </li>
                </Link>)
            }
        })

        return (
            <div className="holdings-portfolio">
                <h1 className="portfolio-header">Portfolio</h1>
                {tickerArr}
            </div>
        );
    }
}

export default Portfolio;