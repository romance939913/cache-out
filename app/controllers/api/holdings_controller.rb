class Api::HoldingsController < ApplicationController
    def create
        if params[:holding][:buying_power].to_f >= 0
            @user_records = Holding.where(user_id: params[:holding][:user_id])
            @update_record = @user_records.find_by(ticker: params[:holding][:ticker])

            if @update_record
                new_amt = @update_record.quantity + params[:holding][:quantity].to_i
                @update_record.update(quantity: new_amt)
                @holding = @update_record
                render :show
            else
                @holding = Holding.new(holdings_params)
                @holding.save
                render :show
            end
        end
    end

    def index
        @holdings = Holding.where(user_id: params[:holding][:user_id])
        # debugger
        if @holdings
            render :index
        else
            render json: ['something went wrong'], status: 404
        end
    end

    private
    def holdings_params
        params.require(:holding).permit(:user_id, :ticker, :quantity)
    end
end
