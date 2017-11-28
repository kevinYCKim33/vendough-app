class Transaction < ApplicationRecord
  alias_attribute :user, :sender
  belongs_to :sender, :class_name => "User"
  belongs_to :recipient, :class_name => "User"
  # before_save :pay_transaction, if: :status == "sending"

  def self.newest_first
    where(status: "complete").order('id DESC')
  end

  def sender_name
    sender.name
  end

  def recipient_name
    recipient.name
  end

  def loser_name
    if self.amount > 0
      self.recipient.name
    else
      self.sender.name
    end
  end

  def gainer_name
    if self.amount > 0
      self.sender.name
    else
      self.recipient.name
    end
  end

  def concise_date
    (self.created_at - 25200).strftime("%b %d")
  end

  def exact_date
    (self.created_at - 25200).strftime("%b %d, %Y %I:%M %p")
  end

  def pay_transaction
    sender.credit -= amount
    recipient.credit += amount
    self.status = "complete"
    self.amount *= -1
    #this way you can tell from reading the db who paid who.
    # i.e. if the amount is negative, the request sender, sent money.
    # i.e. if the amount is positive, the request sender, is gaining money. 
    sender.save
    recipient.save
  end

  def approve_transaction
    # binding.pry
    sender.credit += amount
    recipient.credit -= amount
    self.status = "complete"
    sender.save
    recipient.save
  end




end
