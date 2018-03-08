class LikesController < ApplicationController
  before_action :signed_in?
  before_action :find_dealing, only: [:create, :destroy]

  def create
    like = Like.find_or_create_by(user: current_user, dealing: @dealing)
    like.save
    @dealing.likes << like
    display_likes
  end

  def destroy
    like = Like.find_by(user: current_user, dealing: @dealing)
    like.destroy
    display_likes
  end

  def signed_in?
    if !user_signed_in?
      flash[:error] = "Please sign in or sign up first."
      redirect_to new_user_session_path
    end
  end

  private

  def find_dealing
    @dealing = Dealing.find(dealing_id)
  end

  def display_likes
    users = @dealing.likes.order("id DESC").map do |like|
      user = User.find(like.user_id)
      {name: user.name, id: user.id}
    end
    render json: {dealing_id: @dealing.id, liked_users: users}
  end

  def dealing_id
    params.require(:id)
  end

end
