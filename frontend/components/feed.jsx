import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import moment from 'moment';

function Feed(props) {
  const [ newsOrOrders, toggleFeed ] = useState('news');

  useEffect(() => {
    if (Object.values(props.transactions).length === 0) {
      let orders = document.getElementById("orders-header");
      orders.classList.add("hide")
    } else {
      changeUnderlining("news")
    }
  }, [])

  function changeUnderlining(selection) {
    let news = document.getElementById("news-header");
    let orders = document.getElementById("orders-header");
    if (selection === 'news') {
      news.classList.add("selected");
      orders.classList.remove("selected")
    } else {
      news.classList.remove("selected");
      orders.classList.add("selected");
    }
  }

  function changeFeed(type) {
    changeUnderlining(type)
    if (type === 'news') {
      toggleFeed(type)
    } else {
      toggleFeed(type)
    }
  }

  const contentArr = [];

  if (newsOrOrders === 'news') {
    props.news.forEach((ele, idx) => {
      if (ele.urlToImage) {
        let timePublished = moment(ele.publishedAt).fromNow()
        contentArr.push(
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
  } else {
    Object.values(props.transactions).forEach((order, idx) => {
      let type = '';
      let amount = '';
      order.quantity > 0 ? type = 'Market Buy' : type = 'Market Sell';
      order.quantity === 1 ? amount = 'share' : amount = 'shares';
      contentArr.push(
        <div key={idx} className="order-item-wrapper">
          <div className="order-item-left">
            <p className="order-item-top order-item-type">{type}</p>
            <p className="order-item-bottom">{moment(order.created_at).format('LL')}</p>
          </div>
          <div className="order-item-right">
            <p className="order-item-top">{numeral(order.price).format('$0.00')}</p>
            <p className="order-item-bottom">{Math.abs(order.quantity)} {amount}</p>
          </div>
        </div>
      );
    });
    contentArr.reverse();
  }

  let secondHeader = 'All Transactions';
  if (props.calledFrom === 'show') {
    secondHeader = 'Order History';
  }

  return (
    <div className="show-page-feed-container">
      <div className="show-feed-headers-container">
        <h3 
          id="news-header"
          className="show-feed-header"
          onClick={() => changeFeed('news')}
        >News</h3>
        <h3 
          id="orders-header"
          className="show-feed-header"
          onClick={() => changeFeed('orders')}
        >{secondHeader}</h3>
      </div>
      <div>
        {contentArr}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.entities.users[state.session.id],
  ticker: state.entities.ticker,
  news: state.entities.news,
  transactions: state.entities.transactions
})

export default connect(mapStateToProps, null)(Feed);