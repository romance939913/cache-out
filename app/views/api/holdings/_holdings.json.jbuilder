json.set! holding.ticker do
    json.extract! holding, :id, :user_id, :ticker, :quantity
end