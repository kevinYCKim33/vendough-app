class DealingsController < ApplicationController
  before_action :signed_in?
  helper_method :own_page?


  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      @dealings = Dealing.user_dealings(@user)
      respond_to do |format|
        format.html { render '/users/show' }
        # format.json { render json: @dealings.to_json({:include => [:sender, :recipient]})}
        format.json { render json: @dealings}
      end
    else
      @dealings = Dealing.newest_first
      respond_to do |format|
        format.html { render :index }
        # format.json { render json: @dealings.to_json({:include => [:sender, :recipient]})}
        format.json { render json: @dealings}
      end
    end
  end

  def new
    @dealing = Dealing.new
    if params[:user_id]
      @preselected_user = params[:user_id]
    end
  end

  def create
    @dealing = Dealing.new(dealing_params)
    @dealing.sender = current_user
    if @dealing.valid? #recipient chosen, positive amount chosen, concise desc, payment chosen.
      if @dealing.action == "request"
        @dealing.status = "incomplete"
        @dealing.save
        flash[:message] = "Your request to #{@dealing.recipient.name} has been sent."
        redirect_to user_dealings_path(current_user)
      elsif @dealing.action == "pay"
        @dealing.pay_dealing
        if @dealing.sender.save #the sender has enough funds
          @dealing.recipient.save
          @dealing.save
          flash[:message] = "You have successfully sent money to #{@dealing.recipient.name}."
          redirect_to user_dealings_path(current_user)
        else #the sender does not have enough funds
          flash[:message] = @dealing.sender.errors[:credit].first
          render :new
        end
      end
    else #the transaction is invalid
      render :new
    end
  end

  def update #i.e. approving dealing
    @dealing = current_user.requests_for_money_from_others.find_by(id: params[:dealing][:id])
    @dealing.approve_dealing
    if @dealing.recipient.save
      @dealing.sender.save
      @dealing.save
      flash[:message] = "You have successfully approved the request from #{@dealing.sender.name}."
    else
      flash[:message] = "Insufficient funds to approve transaction."
    end
    redirect_back(fallback_location: root_path)
  end

  def requests
    @requests = current_user.requests_for_money_from_others
  end

  def incomplete
    @dealings = current_user.requests_awaiting_approval_by_others
  end

  def show
    @dealing = Dealing.find(params[:id])
    @comments = @dealing.comments
    respond_to do |format|
      format.html { render :show }
      # format.json { render json: @dealings.to_json({:include => [:sender, :recipient]})}
      format.json { render json: @dealing }
    end
  end

  def destroy
    @dealing = Dealing.find(params[:id])
    @dealing.destroy
    redirect_back(fallback_location: root_path)
  end

  def signed_in?
    if !user_signed_in?
      redirect_to new_user_session_path
    end
  end

  def own_page?
    current_user.id == @user.id
  end
  private

  def dealing_params
    params.require(:dealing).permit(:recipient_id, :amount, :description, :action, :tags_attributes => [:name])
  end

end
