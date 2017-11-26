class Transaction < ApplicationRecord
  # before_save :pay_transaction, if: :status == "sending"

  def self.newest_first
    order('id DESC')
  end

  def self.incomplete(current_user)
    where(status: "incomplete", sender_id: current_user.id)
  end

  def sender_name
    User.find_by(id: self.sender_id).name
  end

  def recipient_name
    User.find_by(id: self.recipient_id).name
  end

  def concise_date
    (self.created_at - 25200).strftime("%b %d")
  end

  def exact_date
    (self.created_at - 25200).strftime("%b %d, %Y %I:%M %p")
  end

  def pay_transaction
    sender = User.find_by(id: self.sender_id)
    recipient = User.find_by(id: self.recipient_id)
    sender.credit -= self.amount
    recipient.credit += self.amount
    self.status = "Complete"
    sender.save
    recipient.save
  end



end
