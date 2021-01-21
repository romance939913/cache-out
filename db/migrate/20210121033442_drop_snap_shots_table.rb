class DropSnapShotsTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :snap_shots_tables
  end
end
