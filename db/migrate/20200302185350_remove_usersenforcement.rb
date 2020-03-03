class RemoveUsersenforcement < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :buying_power, :float
  end
end
