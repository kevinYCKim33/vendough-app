class AddAvatarUrlToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :avatar_url, :string, :default => "https://i.imgur.com/jjQ5Z2i.png"
  end
end
