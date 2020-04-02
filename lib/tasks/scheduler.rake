namespace :scheduler do
  task :add_portfolio_snapshots_for_day => :environment do
    puts "Adding day's portfolio snapshots..."

    date = Date.today
    next if date.on_weekend?
    
    users = User.all

    users.each do |user| 
      balance = user.calculate_total_assets
      PortfolioSnapshot.create({ valuation: balance, user_id: user.id })
    end
    
    puts "done."
  end
end