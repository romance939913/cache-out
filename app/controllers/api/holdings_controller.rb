class Api::HoldingsController < ApplicationController
    def create
        @holding = Holding.new(holdings_params)
        if @holding.save
            render :show
        else
            render json: @holding.errors.full_messages, status: 422
        end
    end

    # def update

    # end

    private
    def holdings_params
        params.require(:holding).permit(:user_id, :ticker, :quantity)
    end
end
