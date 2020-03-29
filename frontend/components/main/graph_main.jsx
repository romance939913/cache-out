import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';


class GraphMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            equityBalance: [],
            time: "1d"

        };
    }

    componentDidMount() {
        let tickers = this.props.tickers;
        tickers.forEach((ticker, idx) => {
            this.props.receiveRealTimePrice(ticker);
        });
        this.props.receiveIndexPrices("^DJI");
    }
    
    render() {  
        let totalEquity = 0;
        if (Object.keys(this.props.price).length !== this.props.tickers.length) return null;
        if (this.props.indexPrices.prices === undefined) return null;

        this.props.tickers.forEach((ticker, idx) => {
            if(this.props.holdings[ticker].quantity !== 0) {
                let value = this.props.holdings[ticker].quantity * this.props.price[ticker].price;
                totalEquity = totalEquity + value;
            }
        });

        let data = this.props.indexPrices.prices;
        let d = new Date();
        let date = d.getDate().toString();
        let dateFix = date.padStart(2, "0");
        if (this.state.time === "1d") {
            data = data.filter(obj => {
                let oDate = obj.date.split(" ");
                let oday = oDate[0].split("-");
                return oday[2] === dateFix;
            });
            data = data.reverse();
        } else if (this.state.time === "1w") {
            data = this.props.indexPrices.prices.slice(-31);
        } else if (this.state.time === "1m") {
            data = this.props.indexPrices.prices.slice(-31);
        } else if (this.state.time === "3m") {
            data = this.props.indexPrices.prices.slice(-93);
        } else if (this.state.time === "1y") {
            data = this.props.indexPrices.prices.slice(-261);
        }

        const renderLineChart = (
            <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="close" stroke="#21ce99"/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <YAxis domain={['dataMin', 'dataMax']}/>
                <Tooltip />
            </LineChart>
        );

        return (
            <div>
                <h2 className="main-page-total-assets">{`$${(this.props.cash + totalEquity).toFixed(2)}`}</h2>
                <p className ="main-page-buying-power">Cash balance: {`$${(this.props.cash).toFixed(2)}`}</p>
                <div className="portfolio-graph-div">
                    {renderLineChart}
                </div>
                <ul className="stock-time-frames">
                    {/* classname ternary for active link (state) */}
                    <li onClick={() => this.setState({ time: "1d" })} className="stock-time-frame">1D</li>
                    <li onClick={() => this.setState({ time: "1w" })} className="stock-time-frame">1W</li>
                    <li onClick={() => this.setState({ time: "1m" })} className="stock-time-frame">1M</li>
                    <li onClick={() => this.setState({ time: "3m" })} className="stock-time-frame">3M</li>
                    <li onClick={() => this.setState({ time: "1y" })} className="stock-time-frame">1Y</li>
                    <li onClick={() => this.setState({ time: "5y" })} className="stock-time-frame">5Y</li>
                </ul>
            </div>
        )
    }
}

export default GraphMain