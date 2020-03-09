class RemoveStockIdFromHoldings < ActiveRecord::Migration[5.2]
  def change
    remove_column :holdings, :stock_id
  end
end
