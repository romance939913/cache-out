export const fetchNasdaq = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/search?query=&limit=&exchange=NASDAQ&apikey=${window.stockapikey}`,
        method: "GET"
    })
)

export const fetchNYSE = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/search?query=&limit=&exchange=nyse&apikey=${window.stockapikey}`,
        method: "GET"
    })
);

export const fetchProfile = (company) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${company}/company?token=${window.iexapikey}`,
        method: "GET"
    })
)

export const fetchProfileFMP = (company) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/profile/${company}?apikey=${window.stockapikey}`,
        method: "GET"
    })
)


export const fetchFinancials = (company) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/income-statement/${company}?apikey=${window.stockapikey}`,
        method: "GET"
    })
)

export const fetchRealTimePrice = (company) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/quote-short/${company}?apikey=${window.stockapikey}`,
        method: "GET",
        crossDomain: true,
    })
)