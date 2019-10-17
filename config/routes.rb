Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :reports, except: [:show, :new, :edit]

      post '/login' => 'sessions#create', as: :login
      get '/logout' => 'sessions#destroy', as: :logout
    end
  end

  root 'homepage#index'
  get '*path', to: 'homepage#index'
end
