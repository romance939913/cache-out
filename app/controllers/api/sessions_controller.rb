class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      login!(@user)
      render 'api/users/show'
    else
      render json: ["invalid credentials"], status: 404
    end
  end

  def destroy
    if current_user
      logout! 
    else
      render json: ['something went wrong'], status: 404
    end
  end
end
