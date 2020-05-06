import React from 'react';
import ShowPageGraph from './show_graph_container';
import TransactionContainer from './transaction_container';
import numeral from 'numeral';

class ShowPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.profile;
    this.showFinancials = this.showFinancials.bind(this)
  }

  componentDidMount() {
    this.props.receiveProfile(this.props.ticker);
    this.props.receiveRealTimePrice(this.props.ticker);
    this.props.receiveNews()
    this.props.receiveFinancials(this.props.ticker);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.match.params.ticker !== this.props.match.params.ticker) {
      this.props.receiveProfile(this.props.ticker);
      this.props.receiveRealTimePrice(this.props.ticker);
      this.props.receiveFinancials(this.props.ticker);
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

  undoScientificNotation(arg) {
    if (arg.includes("E") || arg.includes("e")) {
      let strVersion = arg.toString();
      let withoutExp = strVersion.includes("E") ? strVersion.split("E") : strVersion.split("e")
      let withoutDecimal = withoutExp[0].split(".")
      let start = withoutDecimal[0] + withoutDecimal[1]
      let final = start.padEnd(parseInt(withoutExp[1]) + 1, "0")
      return numeral(parseInt(final)).format('0.0a')
    } else {
      return numeral(parseInt(arg)).format('0.0a')
    }
  }

  componentWillUnmount() {
    this.props.clearRealTimePrice();
  }

  render() {
    if (this.props.profile.description === undefined) return null; 
    if (JSON.stringify(this.props.price) === '{}') return null;
    if (this.props.news.length === 0) return null;
    if (this.props.financials.length === 0) return null;

    let MktCap = this.undoScientificNotation(this.props.profile.mktCap);
    let revenue = this.undoScientificNotation(this.props.financials.Revenue)
    let OperatingExpenses = this.undoScientificNotation(this.props.financials['Operating Expenses'])  
    let OperatingIncome = this.undoScientificNotation(this.props.financials['Operating Income'])
    let grossProfit = this.undoScientificNotation(this.props.financials['Gross Profit'])
    let netIncome = this.undoScientificNotation(this.props.financials['Net Income'])

    let newsArr = [];
    this.props.news.forEach((ele, idx) => {
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
    })
      
    return (
        <div>
          <div className="show-page-body-wrapper">
            <div className="graph-transaction-wrapper">
              <div className="graph-and-title-wrapper">
                <h3 className="show-company-name">{this.props.profile.companyName}</h3>
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
                      <li className="show-ceo">{this.props.profile.ceo}</li>
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
                      <h2>exchange</h2>
                      <li>{this.props.profile.exchange}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Market Cap</h2>
                      <li>{MktCap}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Last Dividend</h2>
                      <li>{numeral(this.props.profile.lastDiv).format('0,0.00')}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Average Volume</h2>
                      <li>{numeral(this.props.profile.volAvg).format('0.0a')}</li>
                    </div>
                    <div className="show-page-attr-item">
                      <h2>Day change</h2>
                      <li>{this.props.profile.changes}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Revenue</h2>
                      <li>{revenue}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Gross Profit</h2>
                      <li>{grossProfit}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Inc</h2>
                      <li>{OperatingIncome}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>EPS</h2>
                      <li>{numeral(parseFloat(this.props.financials['EPS'])).format('$0,0.00')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Net Income</h2>
                      <li>{netIncome}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Gross Margin</h2>
                      <li>{numeral(parseFloat(this.props.financials['Gross Margin'])).format('0,0.00')}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>Operating Exp</h2>
                      <li>{OperatingExpenses}</li>
                    </div>
                    <div className="show-page-attr-item financials hide">
                      <h2>DPS</h2>
                      <li>{numeral(parseFloat(this.props.financials['Dividend per Share'])).format('$0,0.00')}</li>
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