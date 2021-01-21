class Transaction < ApplicationRecord
  validates :ticker, :quantity, :user_id, :price, presence: true
end
