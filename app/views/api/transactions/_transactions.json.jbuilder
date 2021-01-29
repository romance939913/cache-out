json.set! transaction.id do
    json.extract! transaction, :id, :user_id, :ticker, :quantity, :price, :created_at
end