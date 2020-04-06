namespace :scheduler do
  task :add_portfolio_snapshots_for_day => :environment do
    puts "Adding day's portfolio snapshots..."
    require 'date'

    date = Date.today
    next if date.saturday?
    next if date.sunday?

    time = Time.now
    timeString = time.to_s
    timeArr = timeString.split(" ")[1]
    hour = timeArr.split(":")[0]
    min = timeArr.split(":")[1]
    next if hour.to_i < 13 && min.to_i < 30
    next if hour.to_i > 19

    
    users = User.all
    users.each do |user| 
      balance = user.calculate_total_assets
      PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end
end