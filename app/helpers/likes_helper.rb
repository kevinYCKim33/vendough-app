module LikesHelper

  def show_heart_or_unlike_heart(dealing)
    if dealing.likes.select { |like| like.user_id == current_user.id }.empty?
      "show-heart"
    else
      "unlike-heart"
    end
  end

  def blue_or_gray(dealing)
    if dealing.likes.select { |like| like.user_id == current_user.id }.empty?
      '#a8a8a8'
    else
      'rgb(061,149,206)'
    end
  end

  #a lotta code just to get the current user's name to show up first on a like list
  def display_likes(dealing)
    if dealing.likes.empty?
      "Be the first to like this."
    else
      likes_arr = dealing.likes.map {|like| {user_name: like.user.name, user_id: like.user.id}}
      current_user_index = likes_arr.index do |like|
        like[:user_id] == current_user.id
      end
      if current_user_index
        likes_arr.unshift(likes_arr.delete_at(current_user_index))
      end
      likes_arr.map { |like|
        link_to like[:user_name], user_dealings_path(like[:user_id])
      }.join(", ")
    end
  end



end
