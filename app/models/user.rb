class User < ApplicationRecord
  attr_reader :password

  validates :password_digest, :buying_power, presence: true
  validates :username, :session_token, uniqueness: true, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  before_validation :ensure_session_token

  has_many(:holdings, {
    foreign_key: :user_id,
    class_name: :Holding,
    dependent: :destroy
  })

  def self.find_by_credentials(username, password) 
    @user = User.find_by(username: username)
    @user && @user.is_password?(password) ? @user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def password=(password) 
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def reset_session_token!
    self.update!(session_token: SecureRandom.urlsafe_base64(16))
    self.session_token
  end


  def stocks_owned
    stocks = Hash.new(0)
    return [] if holdings.empty?
    transactions_with_stocks = transactions.includes(:stock)

    transactions_with_stocks.each do |transaction|
      curr_stock = transaction.stock
      if transaction.order_type == 'buy'
        stocks[curr_stock.ticker] += transaction.num_shares
      else
        stocks[curr_stock.ticker] -= transaction.num_shares
      end
    end

    stocks.reject { |_, shares| shares.zero? }
  end


  def calculate_stocks
    return [] if stocks_owned.empty?

    stocks = stocks_owned
              .map { |stock| {symbol: stock[0], shares: stock[1]} }
              .sort_by { |stock| stock[:symbol] }

    url = "https://cloud.iexapis.com/stable/stock/market/batch?types=quote,chart&range=1d&token=#{Rails.application.credentials.iex_key}&symbols="
    stocks.each { |stock| url += "#{stock[:symbol]},"}
    response = JSON.parse(open(url).read)

    #Credit to user245031 and lolmaus - Andrey Mikhaylov on Stack Overflow for the code to make API call in Ruby
    # response = JSON.parse(open(url).read)
    stocks.each_with_index do |stock, idx|
      price = response[stock[:symbol]]['quote']['latestPrice'].to_f.round(2).to_s
      if !price.include?('.')
        price += '.00'
      elsif price.split('.')[1].length == 1
        price += '0'
      end
      stock[:price] = price
      stock[:intradayData] = response[stock[:symbol]]['chart']
      stock[:openPrice] = stock[:intradayData][0]['open']
    end

    stocks
  end

  def calculate_balance
    stocks = calculate_stocks
    balance = calculate_buying_power
    stocks.each do |stock|
      balance += (stock[:price].to_f * stock[:shares])
    end
    
    balance.round(2)
  end
end

