class Api::HoldingsController < ApplicationController
  def create
    @update_record = Holding.where(user_id: params[:holding][:user_id]).find_by(ticker: params[:holding][:ticker])
    if @update_record
      new_amt = @update_record.quantity + params[:holding][:quantity].to_i
      if new_amt > 0
        @update_record.update(quantity: new_amt)
        @holding = @update_record
        render :show
      elsif new_amt == 0
        @update_record.update(quantity: new_amt)
        @holding = @update_record
        @update_record.destroy
        render :show
      else
        render json: ["not enough shares"], status: 422
      end
    else
      @holding = Holding.new(holdings_params)
      if @holding.save
        render :show
      else
        render json: @holding.errors.messages[:quantity], status: 422
      end
    end
  end

  def index
    @holdings = Holding.where(user_id: params[:holding][:user_id].to_i)
    if @holdings
      render :index
    else
      render json: []
    end
  end

  def show
    @holdings = Holding.where(user_id: params[:holding][:user_id].to_i)
    @holding = @holdings.find_by(ticker: params[:holding][:ticker])
    if @holding
      render :show
    else
      render json: []
    end
  end

  private
  def holdings_params
    params.require(:holding).permit(:user_id, :ticker, :quantity)
  end
end
