import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';

function ShowFeed(props) {
  const newsArr = [];
  props.news.forEach((ele, idx) => {
    if (ele.urlToImage) {
      let timePublished = moment(ele.publishedAt).fromNow()
      newsArr.push(
        <a key={idx} target="_blank" href={`${ele.url}`}>
          <div className="news-item-wrapper">
            <img className="news-item-image" src={`${ele.urlToImage}`} alt="" />
            <div className="news-item-content">
              <div>
                <p className="news-item-title">{ele.title}</p>
                <p className="news-item-description">{ele.description}</p>
              </div>
              <div className="news-website-time-wrapper">
                <p className="news-website-time">{ele.source.name}</p>
                <p className="news-website-time">Published {timePublished}</p>
              </div>
            </div>
          </div>
        </a>
      )
    }
  })

  // const transactionsArr = Object.values(props.transactions).map((order, idx) => {
  //   return (
  //     <div key={idx}>
  //       <p>{order.price}</p>
  //       <p>{order.ticker}</p>
  //       <p>{order.quantity}</p>
  //       <p>{order.created_at}</p>
  //     </div>
  //   )
  // })

  return (
    <div className="show-page-feed-container">
      <h3 className="news-show-header">News</h3>
      <div>
        {newsArr}
      </div>
      {/* <div>
        {transactionsArr}
      </div> */}
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
    currentUser: state.entities.users[state.session.id],
    ticker: state.entities.ticker,
    news: state.entities.news,
    transactions: state.entities.transactions
})

// const mapDispatchToProps = dispatch => ({
//     receiveProfile: (company) => dispatch(receiveProfile(company)),
//     receiveRealTimePrice: (ticker) => dispatch(receiveRealTimePrice(ticker)),
//     receiveNews: () => dispatch(receiveNews()),
//     clearRealTimePrice: () => dispatch(clearRealTimePrice()),
//     receiveFinancials: (ticker) => dispatch(receiveFinancials(ticker)),
//     receiveDay: (ticker) => dispatch(receiveDay(ticker)),
//     receiveWeek: (ticker) => dispatch(receiveWeek(ticker)),
//     receiveHistorical: (ticker) => dispatch(receiveHistorical(ticker)),
//     clearGraphPrices: () => dispatch(clearGraphPrices()),
//     getTransactions: (creds) => dispatch(getTransactions(creds))
// })

export default connect(mapStateToProps, null)(ShowFeed);