namespace :scheduler do

  task :add_portfolio_snapshots_for_day => :environment do
    require 'date'
    require 'us_bank_holidays'
    require 'time'
    require 'open-uri'

    puts "Adding day's portfolio snapshots..."

    today = Date.today
    next if today.weekend?
    next if today.bank_holiday?
  
    stocks_to_find = []
    users = User.all
    users.each do |user|
      holdings = user.holdings
      holdings.each do |stock|
        stocks_to_find << stock.ticker
      end
    end

    symbols = stocks_to_find.flatten.uniq.join(",")
    url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/#{symbols}?apikey=#{Rails.application.credentials.stockapi[:api_key]}"
    prices = JSON.parse(open(url).read)

    obj = {}
    prices['companiesPriceList'].each do |price|
      obj[price['symbol']] = price['price']
    end

    users.each do |user| 
      balance = user.calculate_total_assets(obj)
      PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end
end