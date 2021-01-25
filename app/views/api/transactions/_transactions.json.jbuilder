json.set! transaction.ticker do
    json.extract! transaction, :id, :user_id, :ticker, :quantity, :price
end