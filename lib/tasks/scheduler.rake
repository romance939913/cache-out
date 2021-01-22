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
  
    right_now = Time.now.getlocal('-05:00')
    market_open = Time.new(Time.now.year,Time.now.month,Time.now.day,9,20,0, "-05:00")
    market_close = Time.new(Time.now.year,Time.now.month,Time.now.day,15,50,0, "-05:00")

    next if right_now < market_open
    next if right_now > market_close

    users = User.all
    users.each do |user| 
      balance = user.calculate_total_assets
      PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end

  task :remove_snapshot_if_older_than_month_and_not_day_close => :environment do
    require 'date'
    
    users = User.all
    today = Date.today
    month_ago = today.prev_month

    users.each do |user| 
      snapshots = user.portfolio_snapshots
      snapshots.each do |snapshot|
        date_string = snapshot.created_at.to_s
        date = date_string.split(" ")[0]
        snap_year = date.split("-")[0]
        snap_month = date.split("-")[1]
        snap_day = date.split("-")[2]
        snap_date = Date.new(snap_year.to_i, snap_month.to_i, snap_day.to_i)

        case snap_date <=> month_ago
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