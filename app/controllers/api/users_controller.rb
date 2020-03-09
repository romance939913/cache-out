class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    @user.buying_power = @user.buying_power.to_f
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  # def update

  # end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :buying_power)
  end
end