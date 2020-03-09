class AddColumnTickerToHoldings < ActiveRecord::Migration[5.2]
  def change
    add_column :holdings, :ticker, :string
  end
end
