post '/memes' do
    meme = Meme.create(title: params[:title], message: params[:message])
    if meme.valid?
      meme.to_json
    else
      status 422
      meme.errors.to_json
    end
  end
  