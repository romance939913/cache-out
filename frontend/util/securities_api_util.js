export const fetchStocks = () => (
    $.ajax({
        url: '/api/stocks',
        method: "GET"
    })
)

export const fetchProfile = (company) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${company}/company?token=${window.iexapikey2}`,
        method: "GET"
    })
)

export const fetchFinancials = (company) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${company}/financials?period=annual&token=${window.iexapikey2}`,
        method: "GET"
    })
)

export const fetchAdvancedStats = (company) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${company}/advanced-stats?token=${window.iexapikey2}`,
        method: "GET"
    })
)

export const fetchRealTimePrice = (company) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/quote-short/${company}?apikey=${window.stockapikey}`,
        method: "GET"
    })
)