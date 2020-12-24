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

  def update
    @user = User.find_by(id: params[:holding][:user_id])
    @holding = Holding.where(user_id: params[:holding][:user_id]).find_by(ticker: params[:holding][:ticker])
    if !@holding && params[:holding][:quantity].to_i < 0
      render :show
    elsif @holding && @holding.quantity + params[:holding][:quantity].to_i < 0
      render :show
    else  
      if @user.update(buying_power: params[:holding][:buying_power].to_f)
        render :show
      else
        render json: @user.errors.messages[:buying_power], status: 404
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :buying_power)
  end
end
