json.set! holding.id do
    json.extract! holding, :id, :user_id, :ticker, :quantity
end