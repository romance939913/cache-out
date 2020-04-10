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
    
    render() {
        let tickerArr = [];
        let d = new Date();
        let day = d.getDay();
        let isWeekend = (day === 6) || (day === 0);

        if (this.props.tickers.length === 0) {
            return (
                <div className="holdings-portfolio">
                    <p className="portfolio-header">portfolio</p>
                    {tickerArr}
                </div>
            );
        }

        Object.values(this.props.holdings).forEach((ticker, idx) => {
            if (ticker.quantity !== 0) {

                let color;
                let data = this.props.graphPrices[ticker.ticker]

                data = data.filter(obj => {
                    let oDate = obj.date.split(" ");
                    return moment(oDate[0]).isSame(d, 'day')
                })

                data = data.slice();
                data = data.reverse();

                let dayDifference = data.slice(-1)[0].close - data[0].close;

                if (dayDifference >= 0) {
                    color = '#21ce99'
                } else {
                    color = '#ff0000'
                }

                let percentage = dayDifference / data[0].close;
                percentage = numeral(percentage).format('0.00%')

                const renderLineChart = (
                    <LineChart
                        width={100}
                        height={50}
                        data={data}>
                        <Line type="monotone" dataKey="close" stroke={color} dot={false} />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <YAxis domain={['dataMin', 'dataMax']} axisLine={false} hide={true} />
                        <XAxis dataKey='date' hide={true} />
                    </LineChart>
                );

                tickerArr.push(<Link
                    to={`/show/${ticker.ticker}`}
                    key={idx}>
                    <li key={idx} className="holding-portfolio-li">
                        <div className="portfolio-ele portfolio-ele-left">
                            <p>{ticker.ticker}</p>
                            <p className="portfolio-ele-small">{numeral(ticker.quantity).format('0,0')} shares</p>
                        </div>
                        <div className="chart-thumbnail">
                            {renderLineChart}
                        </div>
                        <div className="portfolio-ele portfolio-ele-right">
                            <p>{numeral(this.props.price[ticker.ticker].price).format('$0,0.00')}</p>
                            <p className="portfolio-ele-small">{percentage}</p>
                        </div>
                    </li>
                </Link>)
            }
        })

        return (
            <div className="holdings-portfolio">
                <p className="portfolio-header">portfolio</p>
                {tickerArr}
            </div>
        );
    }
}

export default Portfolio;