require 'open-uri'

class Api::NewsController < ApplicationController
  def index
    url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=#{Rails.application.credentials.news[:api_key]}"
    @news = JSON.parse(open(url).read)

    render json: @news
  end
end
