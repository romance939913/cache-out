# Cache Out

Cache Out is my own rendition of the popular securities trading app Robinhood. New users can start with up to $10 million in cash, buy or sell shares of over 8,000 companies and various securities, make informed decisions with interactive company graphs and metrics and track their portfolio's performance overtime with up to the minute market data. A great platform for "practice investing"

***************** This Site will stop working on 4/14/2022. Cancelling FMP API subscription *********************

Here's a link to the [live site](https://cache-out.herokuapp.com/#/)

## Features
* Secure frontend to backend user authentication using the gem BCrypt
* Real-time and historical price data of all stocks traded on the NASDAQ and NYSE exchanges
* Interactive charts displaying a stock's price fluctuation as well as the user's portfolio balance fluctuation over time
* Ability to simulate real stock-market trades by buying and selling shares at the most recent market price
* Ability to search stocks by both their ticker symbol and Company name
* Relevant news displayed for the general market on home page
* A log of the user's overall and security-specific transaction history to see how well certain investments aged

## Portfolio Page
Once a User logs in, they are directed to the portfolio page, which displays a chart showing their portfolio valuation over time and total current assets (total cash + shares held * their current price) above. A list of their holdings is displayed on the right, and below the graph is a financial news feed for the day. 
<br/>
<br/>
![tour-gif](app/assets/images/tour.gif)
<br/>
<br/>
#### Portfolio Snapshots
In order to render the main chart, "snapshots" of the users total portfolio balance are taken throughout the day using Rails Rake tasks (a utility function called at the command line). **add_portfolio_snapshot** This function is called every 10 minutes by a service called Heroku scheduler and create a new "snapshot" for every user. **calculate_total_assets** calculates Portfolio balance by multiplying the quantity of shares owned of a particular security by its current price, and doing that for every single holding + cash. Together, these functions construct the data necessary to show a portfolio performance over time for all users. See below:

```rb
namespace :scheduler do
  task :add_portfolio_snapshot => :environment do
    require 'date'
    require 'us_bank_holidays'
    require 'time'
    require 'open-uri'

    puts "Adding day's portfolio snapshots..."

    today = Date.today
    next if today.weekend?
    next if today.bank_holiday?
  
    rn = Time.now.getlocal('-05:00')
    market_open = Time.new(rn.year,rn.month,rn.day,9,20,0, "-05:00")
    market_close = Time.new(rn.year,rn.month,rn.day,16,00,0, "-05:00")

    next if rn < market_open
    next if rn > market_close

    users = User.all
    users.each do |user| 
      balance = user.calculate_total_assets
      PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end
end
```
```rb
class User < ApplicationRecord
  def calculate_total_assets
    return buying_power if holdings.empty?
    
    prices = {}
    all_holdings = holdings.map { |hold| hold.ticker }.join(",")
    url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/#{all_holdings}?apikey=#{Rails.application.credentials.stockapi[:api_key]}"
    securities = JSON.parse(open(url).read)
    securities["companiesPriceList"].each { |sec| prices[sec['symbol']] = sec["price"] }

    assets = holdings.map { |hold| prices[hold.ticker] * hold.quantity }

    assets.sum + buying_power
  end

  # many more methods....
end
```
## Show Page
An Security show page contains current and historical price information data, general company information, relevant news, and allows users to purchase and sell shares of the stock at the most recent market price. 

#### Fetching Security Data

Upon visiting a show page, a variety of API calls are made to fetch the necessary information to render the price charts, the information ('About' section) and relecant news articles. The following APIs are hit
* [Financial Modeling Prep](https://financialmodelingprep.com/) - 4 separate API calls
  * Company Profile (symbol, company name, CEO, industry, etc.)
  * Real Time asset price which continually updates
  * Intraday Price Data (5 minutes historical prices with volume)
  * Company Financials
* [News API](https://newsapi.org/) - 1 API call

#### Dynamic Chart Rendering
Charts are dynamic and interactive, allowing users to switch between view ranges of **1D**, **1W**, **1M**, **3M**, **1Y**, and **5Y** for individual securities or their overall portfolio. Buttons for each range appear below the chart with click handlers installed, which serve to update the component's local state with the relevant chunk of data. 
<br/>
All of the necessary data is requested when the parent component mounts. Child components do not render until all the data is present. This makes for elegant transitions between pages and graph data rerenders.  

#### Transaction Validation

No Cheating for my users! You are only allowed to purchase the amount of shares you can afford with your current buying power. Additionally, you are only allowed to sell at maximum the number of shares you own of that particular security. 
<br/>
<br/>
![transaction-gif](app/assets/images/transaction.gif) 
<br/>
<br/>
These checks are handled at the model level of my Rails API, and descriptive error messages will be rendered to the page if a user attempts to make an invalid transaction. The form will only submit and trigger a transaction if all model validations pass and no errors are raised.

```rb
class Holding < ApplicationRecord
  validates :quantity, numericality: { 
    greater_than_or_equal_to: 0, 
    message: "not enough shares" 
  }

  # many more methods ...
end

class User < ApplicationRecord
  validates :buying_power, presence: true, numericality: { 
    greater_than_or_equal_to: 0, 
    message: "not enough cash" 
  }

  # many more methods....
end
```

### Search

Users can search for over 8,000 companies and other various securities to purchase across multiple exchanges. Because the navigation element getes reused, this fetch is performed just once when the user signs in. The suggestion logic performed when typing makes sure that exact matches appear at the top.
<br/>
<br/>
![search-gif](app/assets/images/search.gif)
<br/>
<br/>
Users may type in any word or symbol in the companies name and, if specific enough, it will populate in the suggestions box. 

### Technologies and Libraries
* Backend: Ruby on Rails/ActiveRecord/PostgreSQL
* Frontend: React.js/Redux.js
* [Financial Modeling Prep API](https://financialmodelingprep.com/)
* [News API](https://newsapi.org/)
* [Recharts](http://recharts.org/en-US/)
* [CSS Animate](http://animate.css)
* [MomentJS](https://momentjs.com/)
* [NumeralJS](http://numeraljs.com/)
