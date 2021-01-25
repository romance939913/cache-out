class Api::TransactionsController < ApplicationController  
  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def index
    @transactions = Transaction.where(user_id: params[:creds][:user_id])
    if @transactions
      render :index
    else
      render json: []
    end
  end

  def show
    @transactions = Transaction.where(user_id: params[:creds][:user_id]).where(ticker: params[:creds][:ticker])
    if @transactions
      render :index
    else
      render json: []
    end
  end

  private
  def transaction_params
    params.require(:creds).permit(:user_id, :ticker, :quantity, :price)
  end
end
