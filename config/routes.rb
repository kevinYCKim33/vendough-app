Rails.application.routes.draw do
  resources :likes, only: [:create, :destroy]
  get '/dealings/incomplete', to: 'dealings#incomplete', as: 'incomplete'
  get '/dealings/requests', to: 'dealings#requests', as: "pay_requests"
  # ^^ must be above dealing resource otherwise thinks it's a show
  resources :dealings, except: [:edit, :create]
  post '/dealings/new', to: 'dealings#create', as: 'create_dealing'
  # ^^ custom post route so when rendering a new view with errors, the url shows /dealings/new instead of /dealings
  devise_for :users, controllers: { sessions: "users/sessions", registrations: "users/registrations", :omniauth_callbacks => "users/omniauth_callbacks"}

  resources :users, only: [:show, :update] do
    resources :dealings, only: [:index, :new]
  end

  resources :comments, only: [:create]

  get '/contacts', to: 'users#index', as: 'contacts'
  get '/add_fund', to: 'users#edit', as: 'add_fund'
  get '/change_profile_pic', to: 'users#change_profile_pic', as: 'change_profile_pic'
  patch '/update_profile_pic', to: 'users#update_profile_pic', as: 'update_profile_pic'
  resources :tags, only: [:index, :show]

  root 'dealings#index'

end
