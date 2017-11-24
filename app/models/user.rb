class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable, :omniauth_providers => [:facebook]

  def self.from_omniauth(auth)
   where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
     user.name = auth.info.name
     user.email = auth.info.email
     user.password = Devise.friendly_token[0,20]
   end
  end

  def self.friends(current_user)
    where.not("id = ?", current_user.id)
  end
end
