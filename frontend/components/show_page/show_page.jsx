import ShowPageGraph from './show_graph';
import TransactionForm from './transaction_form';
import Navbar from '../nav/nav';
import Feed from '../feed';
import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import RingLoader from "react-spinners/RingLoader";
import {
  receiveProfile,
  receiveRealTimePrice,
  receiveFinancials
} from '../../actions/security_actions';
import {
  receiveNews,
  receiveDay,
  receiveWeek,
  receiveHistorical,
  clearGraphPrices
} from '../../actions/graph_actions';
import {
  getTransactions
} from '../../actions/transaction_actions'

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.showFinancials = this.showFinancials.bind(this);
  }

  componentDidMount() {
    let creds = {
      user_id: this.props.currentUser.id,
      ticker: this.props.ticker
    }
    this.props.receiveProfile(this.props.ticker);
    this.props.receiveRealTimePrice(this.props.ticker);
    this.props.receiveFinancials(this.props.ticker);
    this.props.clearGraphPrices();
    this.props.receiveDay(`${this.props.ticker}`);
    this.props.receiveWeek(this.props.ticker);
    this.props.receiveHistorical(this.props.ticker);
    this.props.getTransactions(creds);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
      let creds = {
        user_id: this.props.currentUser.id,
        ticker: this.props.ticker
      }
      this.props.receiveProfile(this.props.ticker);
      this.props.receiveRealTimePrice(this.props.ticker);
      this.props.clearGraphPrices();
      this.props.receiveFinancials(this.props.ticker);
      this.props.receiveDay(`${this.props.ticker}`);
      this.props.receiveWeek(this.props.ticker);
      this.props.receiveHistorical(this.props.ticker)
      this.props.getTransactions(creds);
    }
  }

  showFinancials() {
    let toggleFinancials = document.getElementById("toggle-financials")
    let attrs = Array.from(document.getElementsByClassName("financials"))
    if (toggleFinancials.innerText === "show more") {
      attrs.forEach(ele => {
        ele.classList.remove("hide")
      })
      toggleFinancials.innerText = "show less"
    } else {
      attrs.forEach(ele => {
        ele.classList.add("hide")
      })
      toggleFinancials.innerText = "show more"
    }
  }

  render() {
    if (this.props.profile.description === undefined
      || JSON.stringify(this.props.price) === '{}'
      || this.props.news.length === 0
      || this.props.transactions.length === 0
      || !this.props.graphPrices['Day']
      || !this.props.graphPrices['Week']
      || !this.props.graphPrices['Historical']
      || this.props.price[this.props.ticker] === undefined) {
      return (
        <div>
          <Navbar />
          <div className="show-page-loading">
            <RingLoader
              css={""}
              size={150}
              color={"#21ce99"}
              loading={true}
            />
          </div>
        </div>
      )
    } 

    let exchangeVar = null;
    if (this.props.profile.exchange === 'NEW YORK STOCK EXCHANGE, INC.'){
      exchangeVar = 'NYSE'
    } else {
      exchangeVar = 'Nasdaq'
    }

    return (
      <div>
        <Navbar />
        <div>
          <div className="show-page-body-wrapper">
            <div className="graph-transaction-wrapper">
              <div className="graph-and-title-wrapper">
                <ShowPageGraph 
                  ticker={this.props.ticker}
                />
                <ul className="company-profile">
                  <div>
                    <div className="about-div-header">
                      <h3 className="show-page-about-header">About</h3>
                      <p className="show-more" 
                          id="toggle-financials" 
                          onClick={this.showFinancials}
                      >show more</p>
                    </div>
                    <li className="show-page-about-description">{this.props.profile.description}</li>
                  </div>
                  <div className="show-page-attr-wrapper">
                    <div className="show-page-attr-item">
                      <h2>CEO</h2>
                      <li className="show-ceo">{this.props.profile.CEO}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Sector</h2>
                      <li>{this.props.profile.sector}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Industry</h2>
                      <li>{this.props.profile.industry}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Employees</h2>
                      <li>{numeral(this.props.profile.employees).format('0,0')}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Exchange</h2>
                      <li>${exchangeVar}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Location</h2>
                      <li>{this.props.profile.city}, {this.props.profile.state}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Market Cap</h2>
                    <li>{numeral(this.props.financials.mktCap).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Average Volume</h2>
                      <li>{numeral(this.props.financials.volAvg).format('0,0')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Revenue</h2>
                      <li>{numeral(this.props.financials.revenue).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Inc</h2>
                      <li>{numeral(this.props.financials.grossProfit).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>GP Ratio</h2>
                      <li>{numeral(this.props.financials.grossProfitRatio).format('0.00')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>EPS</h2>
                      <li>{numeral(this.props.financials.eps).format('$0.00')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Net Income</h2>
                      <li>{numeral(this.props.financials.netIncome).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Exp</h2>
                      <li>{numeral(this.props.financials.operatingExpenses).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Other Expenses</h2>
                      <li>{numeral(this.props.financials.otherExpenses).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Last Dividend</h2>
                      <li>{numeral(this.props.financials.lastDiv).format('$0.00')}</li>
                    </div>
                  </div>
                </ul>
                <Feed 
                  calledFrom={'show'}
                />
              </div>
              <div className="transaction-box">
                <TransactionForm 
                  ticker={this.props.ticker}
                  price={this.props.price} 
                  currentUser={this.props.currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  ticker: ownProps.match.params.ticker,
  profile: state.entities.profile,
  price: state.entities.price,
  news: state.entities.news,
  financials: state.entities.financials,
  graphPrices: state.entities.graphPrices,
  transactions: state.entities.transactions
})

const mapDispatchToProps = dispatch => ({
  receiveProfile: (company) => dispatch(receiveProfile(company)),
  receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
  receiveNews: () => dispatch(receiveNews()),
  receiveFinancials: (ticker) => dispatch(receiveFinancials(ticker)),
  receiveDay: (ticker) => dispatch(receiveDay(ticker)),
  receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
  receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
  clearGraphPrices: () => dispatch(clearGraphPrices()),
  getTransactions: (creds) => dispatch(getTransactions(creds))
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPage);

