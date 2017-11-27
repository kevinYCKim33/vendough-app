module ApplicationHelper
  def display_credit
    sprintf("%.2f", current_user.credit)
  end

  def incomplete_count
    current_user.requests_awaiting_approval_by_others.count unless
    current_user.requests_awaiting_approval_by_others.empty?
  end

  def requests_count
    current_user.requests_for_money_from_others.count unless
    current_user.requests_for_money_from_others.empty?
  end

  def active?(path)
    'active' if current_page?(path)
  end
end
