class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.decimal :amount, precision: 7, scale: 2
      t.string :description
      t.integer :disburser_id
      t.integer :collector_id
      t.string :status
      t.timestamps
    end
  end
end
