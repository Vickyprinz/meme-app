class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users, id: :serial do |t|
      t.string  :username
      t.string :email
      t.string :gender
      t.integer :age
      t.timestamps
    end
  end
end
