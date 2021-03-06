class UsersController < ApplicationController
  helper_method :own_page?
  before_action :signed_in?

  def index
    @contacts = User.contacts(current_user)
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @contacts.to_json }
    end
  end

  # def show
  #    @post = Post.find(params[:id])
  #    respond_to do |format|
  #      format.html { render :show }
  #      format.json { render json: @post.to_json(only: [:title, :description, :id],
  #                              include: [author: { only: [:name]}]) }
  #    end
  #  end

  def edit #they type 3000/add_fund
    @user = current_user
  end

  def update #taking amount the user self-added in the /add_fund path
    @user = current_user
    self_fund = user_params[:credit].to_f
    if self_fund > 0
      @user.credit += self_fund
      @user.save
      flash[:message] = "Successfully transferred from your fictitious account."
      redirect_to user_dealings_path(@user)
      # redirect_back(fallback_location: root_path)
    else
      flash[:message] = "Please add an amount > $0"
      redirect_back(fallback_location: root_path)
    end
  end

  def change_profile_pic
    @user = current_user
  end

  def update_profile_pic
    # binding.pry
    @user = current_user
    @user.avatar_url = pic_params[:avatar_url]
    @user.save
    redirect_to root_path
  end

  def show
    @user = User.find_by(id: params[:id])
    @dealings = Dealing.user_dealings(@user)
  end

  def own_page?
    current_user.id == @user.id
  end

  def signed_in?
    if !user_signed_in?
      flash[:error] = "Please sign in or sign up first."
      redirect_to new_user_session_path
    end
  end

  private

  def user_params
    params.require(:user).permit(:credit)
  end

  def pic_params
    params.require(:patch).permit(:avatar_url)
  end

end
