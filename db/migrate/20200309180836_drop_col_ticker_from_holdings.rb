class DropColTickerFromHoldings < ActiveRecord::Migration[5.2]
  def change
    remove_column :holdings, :ticker
  end
end
