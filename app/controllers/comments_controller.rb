class CommentsController < ApplicationController
  before_action :signed_in?

  def create
    @tag = Tag.find(params[:id])
    @dealings = Dealing.all_with_tags_completed(@tag)
  end

  def signed_in?
    if !user_signed_in?
      flash[:error] = "Please sign in or sign up first."
      redirect_to new_user_session_path
    end
  end

end
