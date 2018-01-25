class DealingSerializer < ActiveModel::Serializer
  attributes :id, :amount, :description, :status, :created_at, :updated_at, :action
  belongs_to :sender, serializer: ParticipantsInfoSerializer
  belongs_to :recipient, serializer: ParticipantsInfoSerializer
  has_many :comments
  has_many :tags
end
