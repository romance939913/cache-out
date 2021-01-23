json.set! transaction do
    json.extract! transaction, :id, :user_id, :ticker, :quantity, :price
end