module ApplicationHelper

  def user_pic
    if active?(root_path)
      link_to add_fund_path do
        image_tag current_user.avatar_url, size: "90", class: "style_main_pic"
      end
    else
      image_tag current_user.avatar_url, size: "90", class: "style_main_pic"
    end
  end

  def display_credit
    number_to_currency(User.find(current_user.id).credit)
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
