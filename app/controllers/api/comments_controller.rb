class Api::CommentsController < ApplicationController
    

def index
    @comment = User.find(params[:user_id]).comment
    render json: @comment
end

def show
    @comment = Comment.find(params[:id])
    render json: @comment
end

def destroy
    @comment= Comment.find(params[:id])
    @comment.destroy
    render status: 200
end

def update
    @user = User.find(params[:user_id])
    @comment = Comment.find params[:id]
    @comment.update!(comment_params)
    render json: @comment
end

def create
    @user = User.find(params[:user_id])
    @comment = Comment.create!(comment_params)
    render json: @comment
end

  

private
 def procedure_params
    params.require(:comments).permit(:title, :description:, :user_id   )
end
end

