class CreateSnapShotsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :snap_shots_tables do |t|
      t.string :user_id, null: false
      t.float :portfolio_balance, null: false
    end
  end
end
