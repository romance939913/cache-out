# Cache Out

Cache Out is my own rendition of the popular trading app Robinhood. New users can start with up to $10 million in cash, buy or sell shares in over 8,000 various companies and securities, track their performance with real-time market data, and make informed decisions with interactive company graphs and metrics.

Here's a link to the [live site](https://cache-out.herokuapp.com/#/)

## Notable Features
* Secure frontend to backend user authentication using the gem BCrypt
* Real-time and historical price data of all stocks traded on the NASDAQ and NYSE exchanges
* Interactive charts displaying a stock's price fluctuation as well as the user's portfolio balance fluctuation over time
* Ability to simulate real stock-market trades by buying and selling shares at the most recent market price
* Ability to search stocks by both their ticker symbol and Company name
* Relevant news displayed for the general market on home page, and for specific stock on the stock's show page

## Portfolio Page
Once a User logs in, they are directed to the portfolio page, which displays a chart showing their portfolio valuation over time, a list of their holdings with current day metrics, and real-time financial news
<br/>
<br/>
![tour-gif](app/assets/images/tour.gif)
<br/>
<br/>

#### Portfolio Snapshots (**newest feature**)
In order to render charts that display a user's portfolio balance over time, 'snapshots' of the users portfolio are taken using Rails rake tasks and Heroku Scheduler every 10 minutes. Through a simple association between the `User` and `PortfolioSnapshot` models, all of the user's historical portfolio data is fetched.

### Show Page
An Security show page contains current and historical price information data, general company information, relevant news, and allows users to purchase and sell shares of the stock at the most recent market price. 

#### Fetching Security Data

Upon visiting a show page, a variety of API calls are made to fetch the necessary information to render the price charts, the information ('About' section) and relecant news articles. The following APIs are hit
[Financial Modeling Prep](https://financialmodelingprep.com/)
* Financial Modeling Prep - 4 separate API calls
  * Company Profile (symbol, company name, CEO, industry, etc.)
  * Real Time asset price which continually updates
  * Intraday Price Data (5 minutes historical prices with volume)
* [News API](https://newsapi.org/)

#### Dynamic Chart Rendering
Charts are dynamic and interactive, allowing users to switch between ranges of **1D**, **1W**, **1M**, **3M**, **1Y**, and **5Y** for individual stocks or their overall portfolio (the **5Y** range is replaced by the **ALL** range for portfolio chart). Buttons for each range appear below the chart with click handlers installed, which serve to update the React component's local state with the relevant chunk of data. The `renderChart` function takes in one of the aforementioned ranges as a string, using it to key into the `RANGES` hash to determine the appropriate portion of the dailyData to grab.

```js
    handleFetch(time) {
        switch (time) {
            case "1d":
                this.props.receiveDay(`${this.props.ticker}`);
                break;
            case "1w":
                this.props.receiveWeek(`${this.props.ticker}`);
                break;
            case "1m":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "3m":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "1y":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
            case "5y":
                this.props.receiveHistorical(`${this.props.ticker}`);
                break;
        }
    }
```

Here's another gif

![transaction-gif](app/assets/images/transaction.gif)

and here is yet another gif

![search-gif](app/assets/images/search.gif)
