class Transaction < ApplicationRecord
  def make_transaction
    binding.pry
    disburser = User.find_by(id: self.disburser_id)
    collector = User.find_by(id: self.collector_id)
    disburser.credit -= self.amount
    collector.credit += self.amount
    self.status = "Complete"
    self.save
    disburser.save
    collector.save
  end
end
