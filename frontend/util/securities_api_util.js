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

export const fetchIndexes = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/majors-indexes?apikey=${window.stockapikey}`,
        method: "GET"
    })
)

export const fetchProfile = (company) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/aapl/company?token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)

export const fetchFinancials = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/aapl/financials?period=annual&token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)

export const fetchRealTimePrice = (company) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/twtr/price?token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)