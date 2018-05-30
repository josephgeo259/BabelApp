class Api::CommentsController < ApplicationController
    

def index
    @comments = User.find(params[:user_id]).comments
    render json: @comments
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
 def comment_params
    params.require(:comment).permit(:title, :description, :user_id)
end
end

