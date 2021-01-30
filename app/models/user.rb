require 'open-uri'

class User < ApplicationRecord
  attr_reader :password

  validates :email, presence: true
  validates :password_digest, presence: true
  validates :buying_power, presence: true, numericality: { 
    greater_than_or_equal_to: 0, 
    message: "not enough cash" 
  }
  validates :username, :session_token, uniqueness: true, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}

  before_validation :ensure_session_token

  has_many(:holdings, {
    foreign_key: :user_id,
    class_name: :Holding,
    dependent: :destroy
  })

  has_many(:portfolio_snapshots, {
    foreign_key: :user_id,
    class_name: :PortfolioSnapshot,
    dependent: :destroy
  })

  has_many(:transactions, {
    foreign_key: :user_id,
    class_name: :Transaction,
    dependent: :destroy
  })

  def self.find_by_credentials(email, password) 
    @user = User.find_by(email: email)
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
end

