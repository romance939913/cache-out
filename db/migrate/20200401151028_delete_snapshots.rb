class DeleteSnapshots < ActiveRecord::Migration[5.2]
  def change
    drop_table :snapshots
  end
end
