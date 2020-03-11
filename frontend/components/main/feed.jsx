import React from 'react';
import MainNavContainer from './nav/nav_container';
import GraphMainContainer from './graph_main_container';
import { Link } from 'react-router-dom'

class MainFeed extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.currentUser.id
        }
    }

    componentDidMount() {
        this.props.getHoldings(this.state)
    }
    
    render() {
        let tickerArr = []
        // debugger
        if (this.props.holdings.length === 0) {
            return null
        } else {
            Object.values(this.props.holdings).forEach((ticker, idx) => {
                if (ticker.quantity !== 0) {
                    tickerArr.push(<Link
                        to={`/show/${ticker.ticker}`}
                        key={idx}>
                        <li key={idx} className="holding-portfolio-ele-wrapper">
                            <div className="holding-portfolio-ele">
                                <p>{ticker.ticker}</p>      
                                <p>{ticker.quantity}</p>
                            </div>
                        </li>
                    </Link>)
                }
            })
        }
        return (
            <div>
                <MainNavContainer />
                <div className="main-page-wrapper">
                    <div className="graph-valuation-wrapper">

                    </div>
                    <GraphMainContainer />
                    <div className="holdings-portfolio">
                        <p className="portfolio-header">Portfolio</p>
                        {tickerArr}
                    </div>
                </div>
            </div>
        );
    }
}

export default MainFeed;