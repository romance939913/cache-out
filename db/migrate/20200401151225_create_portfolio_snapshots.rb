class CreatePortfolioSnapshots < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_snapshots do |t|
      t.integer :user_id, null: false
      t.float :valuation, null: false
      t.timestamps
    end
  end
end
