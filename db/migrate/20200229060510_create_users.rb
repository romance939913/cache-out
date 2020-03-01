class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, unique: true, null: false
      t.string :email, unique: true, null: false
      t.string :session_token, unique: true, null: false
      t.string :password_digest, null: false
      t.float :buying_power, null: false
      t.timestamps
    end
  end
end
