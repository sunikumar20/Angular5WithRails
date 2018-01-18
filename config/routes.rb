Rails.application.routes.draw do
  root 'pages#index'
  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'
    resources :employees
  end
  get '*unmatchedroute', to: 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
