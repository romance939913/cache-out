namespace :scheduler do
  task :add_portfolio_snapshot => :environment do
    require 'date'
    require 'us_bank_holidays'
    require 'time'
    require 'open-uri'
    require 'byebug'

    puts "Adding day's portfolio snapshots..."

    today = Date.today
    next if today.weekend?
    next if today.bank_holiday?
  
    time = Time.now
    timeString = time.to_s
    timeArr = timeString.split(" ")[1]
    hour = timeArr.split(":")[0]
    min = timeArr.split(":")[1]
    next if hour.to_i < 13
    next if hour.to_i > 19

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