Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :show, :update]
    resource :session, only: [:create, :destroy]
    resources :holdings, only: [:index, :show, :create, :update, :destroy]
    resources :transactions, only: [:index, :create, :show]
    resources :portfolio_snapshots, only: [:index]
    resources :news, only: [:index]
  end

  root to: "static_pages#root"
end