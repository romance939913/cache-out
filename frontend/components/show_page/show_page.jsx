import React from 'react';
import ShowPageGraph from './show_graph_container';
import TransactionContainer from './transaction_container';
import numeral from 'numeral';
import RingLoader from "react-spinners/RingLoader";

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.showFinancials = this.showFinancials.bind(this);
  }

  componentDidMount() {
    this.props.receiveProfile(this.props.ticker);
    this.props.receiveRealTimePrice(this.props.ticker);
    this.props.receiveNews();
    // this.props.receiveFinancials(this.props.ticker);
    // this.props.receiveAdvancedStats(this.props.ticker);
    // this.props.clearGraphPrices();
    this.props.receiveDay(`${this.props.ticker}`);
    // this.props.receiveWeek(`${this.props.ticker}`);
    // this.props.receiveMonth(`${this.props.ticker}`);
    // this.props.receiveThreeMonths(`${this.props.ticker}`);
    // this.props.receiveYear(`${this.props.ticker}`);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
      this.props.receiveProfile(this.props.ticker);
      this.props.receiveRealTimePrice(this.props.ticker);
      this.props.receiveNews();
      // this.props.receiveFinancials(this.props.ticker);
      this.props.receiveDay(`${this.props.ticker}`);
    // this.props.receiveWeek(`${this.props.ticker}`);
    // this.props.receiveMonth(`${this.props.ticker}`);
    // this.props.receiveThreeMonths(`${this.props.ticker}`);
    // this.props.receiveYear(`${this.props.ticker}`);
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

  componentWillUnmount() {
    this.props.clearRealTimePrice();
  }

  render() {
    if (this.props.profile.description === undefined
      || JSON.stringify(this.props.price) === '{}'/*
      || this.props.news.length === 0
      || this.props.financials.length === 0*/
      || !this.props.graphPrices['Day']/*
      || !this.props.graphPrices['Week']
      || !this.props.graphPrices['Month']
      || !this.props.graphPrices['ThreeMonths']
      || !this.props.graphPrices['Year']
      || this.props.price[this.props.ticker] === undefined*/) {
        return (
          <div className="show-page-loading">
            <RingLoader
              css={""}
              size={150}
              color={"#21ce99"}
              loading={true}
            />
          </div>
        )
      } 

    let newsArr = [];
    this.props.news.forEach((ele, idx) => {
      if (this.props.news[idx].urlToImage) {
        newsArr.push(
          <a key={idx} target="_blank" href={`${this.props.news[idx].url}`}>
            <div className="news-item-wrapper">
              <img className="news-item-image" src={`${this.props.news[idx].urlToImage}`} alt="" />
              <div className="news-item-content">
                <div>
                  <p className="news-item-website">{this.props.news[idx].source.name}</p>
                  <p className="news-item-title">{this.props.news[idx].title}</p>
                </div>
                <p className="news-item-description">{this.props.news[idx].description}</p>
              </div>
            </div>
          </a>
        )
      }
    })
      
    return (
        <div>
          <div className="show-page-body-wrapper">
            <div className="graph-transaction-wrapper">
              <div className="graph-and-title-wrapper">
                <ShowPageGraph 
                  ticker={this.props.ticker}
                  price={this.props.price}
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
                      <li>${this.props.profile.exchange}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Location</h2>
                      <li>{this.props.profile.city}, {this.props.profile.state}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Market Cap</h2>
                      <li>{numeral(this.props.advancedStats.marketcap).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Total Assets</h2>
                      <li>{numeral(this.props.financials.totalAssets).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Revenue</h2>
                      <li>{numeral(this.props.financials.totalRevenue).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Gross Profit</h2>
                      <li>{numeral(this.props.financials.grossProfit).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Inc</h2>
                      <li>{numeral(this.props.financials.grossProfit).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>EPS</h2>
                      <li>{numeral(this.props.advancedStats.ttmEPS).format('$0.00')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Net Income</h2>
                      <li>{numeral(this.props.financials.netIncome).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Exp</h2>
                      <li>{numeral(this.props.financials.operatingExpense).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Current Assets</h2>
                      <li>{numeral(this.props.financials.currentAssets).format('$0.00a')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Current Debt</h2>
                      <li>{numeral(this.props.financials.currentDebt).format('$0.00a')}</li>
                    </div>
                  </div>
                </ul>
                <h3 className="news-show-header">News</h3>
                <div>
                    {newsArr}
                </div>
              </div>
              <div className="transaction-box">
                <TransactionContainer 
                  ticker={this.props.ticker}
                  price={this.props.price} 
                  currentUser={this.props.currentUser}
                />
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ShowPage;