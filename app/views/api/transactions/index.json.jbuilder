@transactions.each do |transaction|
    json.partial! "api/transactions/transactions", transaction: transaction
end