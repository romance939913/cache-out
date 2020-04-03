json.set! snapshot.id do
    json.extract! snapshot, :id, :valuation, :created_at
end