json.set! transaction do
    debugger
    json.extract! transaction, :id, :user_id, :ticker, :quantity, :price
end