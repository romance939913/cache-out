class AddTimeStampToSnapShots < ActiveRecord::Migration[5.2]
  def change
    add_column :snap_shots_tables, :created_at, :datetime, null: false
  end
end
