namespace :scheduler do

  task :add_portfolio_snapshots_for_day => :environment do
    require 'date'
    require 'us_bank_holidays'
    require 'byebug'

    puts "Adding day's portfolio snapshots..."

    today = Date.today
    next if today.weekend?
    next if today.bank_holiday?
  
    now = Time.now
    next if (now.hour < 9 && now.min < 30) || (now.hour >= 16 && now.min > 30)

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
      # PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end

  task :remove_snapshot_if_older_than_month_and_not_day_close => :environment do
    require 'date'
    require 'byebug'
    
    users = User.all
    today = Date.today
    yesterday = today.prev_day
    two_days_ago = yesterday.prev_day
    three_days_ago = two_days_ago.prev_day
    four_days_ago = three_days_ago.prev_day
    five_days_ago = four_days_ago.prev_day
    six_days_ago = five_days_ago.prev_day
    week_ago = six_days_ago.prev_day

    users.each do |user| 
      snapshots = user.portfolio_snapshots
      snapshots.each do |snapshot|
        date_string = snapshot.created_at.to_s
        date = date_string.split(" ")[0]
        snap_year = date.split("-")[0]
        snap_month = date.split("-")[1]
        snap_day = date.split("-")[2]
        snap_date = Date.new(snap_year.to_i, snap_month.to_i, snap_day.to_i)

        case snap_date <=> week_ago
        when -1
          time = date_string.split(" ")[1]
          hour = time.split(":")[0]
          min = time.split(":")[1]
          if (hour.to_i != 19 || min.to_i < 50)
            snapshot.destroy
          end
        end
      end
    end
    
    puts "done."
  end


end