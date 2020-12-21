class Holding < ApplicationRecord
  validates :ticker, :quantity, :user_id, presence: true
  validates :quantity, numericality: { 
    greater_than_or_equal_to: 0, 
    message: "not enough shares" 
  }

  belongs_to(:user, {
    foreign_key: :user_id,
    class_name: :User
  })
end
