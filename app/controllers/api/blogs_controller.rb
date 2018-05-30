class Api::BlogsController < ApplicationController
    
def index
    @blogs = User.find(params[:user_id]).blogs
    render json: @blog
end

def show
    @blog = Blog.find(params[:id])
    render json: @blog
end

def destroy
    @blog= Blog.find(params[:id])
    @blog.destroy
    render status: 200
end

def update
    @user = User.find(params[:user_id])
    @blog = Blog.find params[:id]
    @blog.update!(blog_params)
    render json: @blog
end

def create
    @user = User.find(params[:user_id])
    @blog = Blog.create!(blog_params)
    render json: @blog
end

  

private
 def procedure_params
    params.require(:blogs).permit(:title, :post, :user_id )
end
end


