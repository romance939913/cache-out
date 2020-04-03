class Api::PortfolioSnapshotsController < ApplicationController
    def index
        @snapshots = PortfolioSnapshot.where(user_id: params[:userId].to_i)
        if @snapshots
            render :index
        else
            render json: ['no user holdings yet'], status: 404
        end
    end
end
