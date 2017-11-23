class FriendsController < ApplicationController

  def index
    @friends = User.friends(current_user)
  end

  def show
  end



end
