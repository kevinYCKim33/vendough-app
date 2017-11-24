class FriendsController < ApplicationController

  def index
    @friends = User.friends(current_user)
  end

  def show
    binding.pry
    if current_user.id == params[:id].to_i
      binding.pry
      flash[:error] = "You cannot be your own friend"
      redirect_to friends_path
    else
      @friend = User.find_by(id: params[:id])
    end
  end



end
