class Holding < ApplicationRecord
    validates :ticker, :quantity, presence: true
end
