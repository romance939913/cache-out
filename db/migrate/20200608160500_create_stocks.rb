class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :company, unique: true, null: false
      t.string :symbol, unique: true, null: false
      t.timestamps
    end
  end
end
