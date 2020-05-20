require 'open-uri'

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

  has_many(:portfolio_snapshots, {
    foreign_key: :user_id,
    class_name: :PortfolioSnapshot,
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

  def calculate_total_assets
    assets = []
    return buying_power if holdings.empty?

    holdings.each do |holding| 
      url = "https://financialmodelingprep.com/api/v3/stock/real-time-price/#{holding.ticker}?apikey=#{Rails.application.credentials.stockapikey[:api_key]}"
      security = JSON.parse(open(url).read)
      assets << security['price'] * holding.quantity
    end

    assets.sum + buying_power
  end
end

