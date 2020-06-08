class Stock < ApplicationRecord
  validates :symbol, :company, presence: true
end
