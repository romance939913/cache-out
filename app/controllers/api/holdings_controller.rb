class Api::HoldingsController < ApplicationController
    def create
        @user_records = Holding.where(user_id: params[:holding][:user_id])
        @update_record = @user_records.find_by(ticker: params[:holding][:ticker])
        if @update_record
            new_amt = @update_record.quantity + params[:holding][:quantity].to_i
            @update_record.update(quantity: new_amt)
        else
            @holding = Holding.new(holdings_params)
            if @holding.save
                render :show
            else
                render json: @holding.errors.full_messages, status: 422
            end
            # check for column that already exists
            ## update user buying power in here as well
        end
    end

    def show
        @holding = Holding.find_by(id: params[:id])
        if @record
            render :show
        else
            render json: ['something went wrong'], status: 404
        end
    end

    private
    def holdings_params
        params.require(:holding).permit(:user_id, :ticker, :quantity)
    end
end
