class LikesController < ApplicationController
  before_action :signed_in?

  def create
    dealing = Dealing.find(dealing_id)
    like = Like.find_or_create_by(user: current_user, dealing: dealing)
    like.save
    dealing.likes << like
    users = dealing.likes.map do |like|
      user = User.find(like.user_id)
      {name: user.name, id: user.id}
    end
    render json: {dealing_id: dealing.id, liked_users: users}
  end

  def destroy
  end

  def signed_in?
    if !user_signed_in?
      flash[:error] = "Please sign in or sign up first."
      redirect_to new_user_session_path
    end
  end

  private

  def dealing_id
    params.require(:id)
  end

end
