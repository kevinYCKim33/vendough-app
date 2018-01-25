class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id, :dealing_id, :created_at, :commenter
  belongs_to :user, serializer: ParticipantsInfoSerializer

  def commenter
    User.find(self.object.user_id).name
  end
end

# {id: 8, content: "testing", user_id: 2, dealing_id: 12, created_at: "2018-01-22T08:20:41.757Z", …}
