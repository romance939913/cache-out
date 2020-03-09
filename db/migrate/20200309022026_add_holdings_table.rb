class AddHoldingsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :holdings do |t|
      t.integer :user_id, foreign_key: true, null: false
      t.integer :stock_id, foreign_key: true, null: false
      t.integer :quantity, null: false
      t.timestamps
    end
  end
end
