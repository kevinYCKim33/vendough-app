class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :dealing_id, :created_at, :updated_at, :commenter
  belongs_to :user, serializer: ParticipantsInfoSerializer

  def commenter
    User.find(self.object.user_id).name
  end
end
