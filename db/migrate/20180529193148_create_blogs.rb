class CreateBlogs < ActiveRecord::Migration[5.2]
  def change
    create_table :blogs do |t|
      t.string :title
      t.string :post
      t.integer :user_id
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
