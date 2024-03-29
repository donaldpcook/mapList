class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.references :user

      t.timestamps
    end
    add_index :locations, :user_id
  end
end
