class LikeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :dealing_id, :liker

  def liker
    User.find(self.object.user_id)
  end

end
