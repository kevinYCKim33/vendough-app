class Transaction < ApplicationRecord
  def make_transaction
    disburser = User.find_by(id: self.disburser_id)
    collector = User.find_by(id: self.collector_id)
    disburser.credit -= self.amount
    collector.credit += self.amount
    self.status = "Complete"
    self.save
    disburser.save
    collector.save
  end

  def disburser_name
    User.find_by(id: self.disburser_id).name
  end

  def collector_name
    User.find_by(id: self.collector_id).name
  end

  def concise_date
    (self.created_at - 25200).strftime("%b %d")
  end

end
