class Removestupidtable < ActiveRecord::Migration[5.2]
  def change
    drop_table :stupid
  end
end
