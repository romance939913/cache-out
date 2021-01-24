class Api::TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token  

  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      render :show
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def index
    @transactions = Transaction.all(transaction_params)
    debugger
    if @transactions
      render :index
    else
      render json: []
    end
  end

  private
  def transaction_params
    params.require(:transaction).permit(:user_id, :ticker, :quantity, :price)
  end
end
