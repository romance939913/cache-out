export const fetchNasdaq = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${window.stockapikey}`,
        method: "GET"
    })
)

export const fetchSNP = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/sp500_constituent?apikey=${window.stockapikey}`,
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

export const fetchRealTimePrices = (companies) => {
    let commaSeparatedString = `${companies[0]}`
    companies.slice(1).forEach(comp => {
        commaSeparatedString += `,${comp}`
    })
    return $.ajax({
        url: `https://financialmodelingprep.com/api/v3/quote-short/${commaSeparatedString}?apikey=${window.stockapikey}`,
        method: "GET",
        crossDomain: true,
    })
}