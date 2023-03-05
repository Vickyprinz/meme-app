# # app/controllers/memes_controller.rb

# class MemesController < ApplicationController
#     def create
#       @meme = Meme.new(meme_params)
      
#       if @meme.save
#         render json: @meme, status: :created
#       else
#         render json: @meme.errors, status: :unprocessable_entity
#       end
#     end
    
#     private
    
#     def meme_params
#       params.require(:meme).permit(:title, :image_url)
#     end
#   end
  