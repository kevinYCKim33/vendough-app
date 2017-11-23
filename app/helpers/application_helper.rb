module ApplicationHelper
  def display_credit
    sprintf("%.2f", current_user.credit)
  end
end
