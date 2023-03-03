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

  # delete meme
  delete '/memes/:id' do
    meme = Meme.find_by(id: params[:id], user_id: session[:user_id])
    if meme
      meme.destroy
      { message: 'Meme deleted successfully' }.to_json
    else
      { error: 'Meme not found or you are not authorized to delete this meme' }.to_json
    end
  end

  # update a meme
  patch '/memes/:id' do
    meme = Meme.find_by(id: params[:id], user_id: session[:user_id])
    if meme
      meme.update(
        title: params[:title],
        message: params[:message]
      )
      meme.to_json
    else
      { error: 'Meme not found or you are not authorized to update this meme' }.to_json
    end
  end

  # create a new meme
  post '/memes' do
    meme = Meme.create(
      title: params[:title],
      message: params[:message],
      user_id: session[:user_id]
    )
    meme.to_json
  end

  # fetch a user with their memes
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

  # fetch all memes
  get '/all_memes' do
    memes = Meme.all
    memes.to_json
  end

  # fetch memes by title or date published
  get '/memes/search' do
    query = params[:q]
    memes = Meme.where("title LIKE ? OR created_at LIKE ?", "%#{query}%", "%#{query}%").order(:created_at)
    memes.to_json
  end
end
