class CreateProjects < ActiveRecord::Migration[6.1]
  def change
   create_table :feedbacks do |t|
  t.references :project, null: false, foreign_key: true
  t.text :content, null: false
  t.integer :rating
  t.json :sender_info

  t.timestamps
end

add_index :projects, :uuid, unique: true

  end
end
