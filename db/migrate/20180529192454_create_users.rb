class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :location
      t.string :spoken_languages
      t.string :learning_interests

      t.timestamps
    end
  end
end
