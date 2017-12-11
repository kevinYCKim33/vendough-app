class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :dealing
  
  def concise_date
    (self.created_at - 25200).strftime("%b %d")
  end
end
