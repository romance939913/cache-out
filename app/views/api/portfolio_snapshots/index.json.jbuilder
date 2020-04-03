@snapshots.each do |snapshot|
    json.partial! "api/portfolio_snapshots/snapshots", snapshot: snapshot
end