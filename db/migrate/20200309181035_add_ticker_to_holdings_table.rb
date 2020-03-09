class AddTickerToHoldingsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :holdings, :ticker, :string, null: false
  end
end
