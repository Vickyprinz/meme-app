class ApplicationController < Sinatra::Base
    configure do
      set :default_content_type, 'application/json'
      enable :sessions
    end
  
    # fetch all memes
    get '/memes' do
      memes = Meme.order(:created_at)
      memes.to_json
    end
  
    # delete specific meme
    delete '/memes/:id' do
      memes = Meme.find(params[:id])
      memes.destroy
      memes.to_json
    end
  
    # create a new meme
    post '/memes' do
      memes = Meme.create(
        title: params[:title],
        message: params[:message],
        user_id: params[:user_id]
      )
      memes.to_json
    end
  
    # update a meme
    patch '/memes/:id' do
      memes = Meme.find(params[:id])
      memes.update(
        title: params[:title],
        message: params[:message]
      )
      memes.to_json
    end
  
    # add a user
    post '/users' do
      users = User.create(
        username: params[:username],
        email: params[:email],
        age: params[:age],
        sex: params[:sex]
      )
      users.to_json
    end
  
    # fetch a user with his memes
    get '/users/:id' do
      user = User.find(params[:id])
      user.to_json(include: :memes)
    end
  
    # register a new user
    post '/register' do
      user = User.new(
        username: params[:username],
        email: params[:email],
        password: params[:password]
      )
      if user.save
        { message: 'User registered successfully' }.to_json
      else
        { errors: user.errors.full_messages }.to_json
      end
    end
  
    # login
    post '/login' do
      user = User.find_by(username: params[:username])
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        { message: 'User logged in successfully' }.to_json
      else
        { error: 'Invalid username or password' }.to_json
      end
    end
  
    # get current user
    get '/me' do
      if session[:user_id]
        user = User.find(session[:user_id])
        { username: user.username, email: user.email }.to_json
      else
        { error: 'Not authenticated' }.to_json
      end
    end
  end
  