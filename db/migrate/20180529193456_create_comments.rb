class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :title
      t.string :description
      t.integer :user_id
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
