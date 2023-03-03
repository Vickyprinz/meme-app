class ApplicationController < Sinatra::Base
  configure do
    set :default_content_type, 'application/json'
    enable :sessions
  end

  before do
    authenticate
  end

  # fetch all memes
  get '/memes' do
    memes = Meme.order(:created_at)
    memes.to_json
  end

  # delete meme
  delete '/memes/:id' do
    memes = Meme.find(params[:id])
    if memes.user == current_user
      memes.destroy
      memes.to_json
    else
      { error: 'You are not authorized to delete this meme' }.to_json
    end
  end

  # update a meme
  patch '/memes/:id' do
    memes = Meme.find(params[:id])
    if memes.user == current_user
      memes.update(
        title: params[:title],
        message: params[:message]
      )
      memes.to_json
    else
      { error: 'You are not authorized to update this meme' }.to_json
    end
  end

  # create a new meme
  post '/memes' do
    memes = Meme.create(
      title: params[:title],
      message: params[:message],
      user_id: current_user.id
    )
    memes.to_json
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
    if current_user
      { username: current_user.username, email: current_user.email }.to_json
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

  private

  def current_user
    User.find_by(id: session[:user_id])
  end

  def authenticate
    halt 401, { error: 'Not authenticated' }.to_json unless current_user
  end
end
