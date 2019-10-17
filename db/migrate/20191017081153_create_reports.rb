class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.string :title
      t.text :description
      t.string :file
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.jsonb :file_data, null: false, default: {}
      t.integer :position, null:false, default: 0

      t.timestamps
    end
  end
end
