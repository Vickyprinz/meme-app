# config/routes.rb

Rails.application.routes.draw do
    # other routes...
  
    post '/memes', to: 'memes#create'
  end
  