class CommentsController < ApplicationController
  before_action :signed_in?

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    @comment.save
    render json: @comment, status: 201
    # redirect_back(fallback_location: root_path)
  end

  def signed_in?
    if !user_signed_in?
      flash[:error] = "Please sign in or sign up first."
      redirect_to new_user_session_path
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :dealing_id)
  end

end
