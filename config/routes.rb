Rails.application.routes.draw do

  namespace :api do

    resources :users do

      resources :blogs, :comments

    end

  end

end