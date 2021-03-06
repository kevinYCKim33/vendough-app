module ApplicationHelper

  def current_user_pic
    if active?(root_path) || own_page?
      link_to change_profile_pic_path do
        image_tag current_user.avatar_url, size: "90", class: "style_main_pic", title: "Update your profile pic"
      end
    end
  end

  def other_user_pic(user)
    image_tag user.avatar_url, size: "90", class: "style_main_pic"
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

  def autofocus?(path)
    "autofocus='autofocus'" if current_page?(path)
  end

end
