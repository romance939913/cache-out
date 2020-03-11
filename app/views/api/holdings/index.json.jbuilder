@holdings.each do |holding|
    json.partial! "api/holdings/holdings", holding: holding
end