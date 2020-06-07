export const fetchStockDay = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/intraday-prices?token=${window.iexapikey}`
    })
)

export const fetchStockWeek = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/5d?token=${window.iexapikey}`
    })
)

export const fetchStockMonth = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/1m?token=${window.iexapikey}`
    })
)

export const fetchStockThreeMonths = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/3m?token=${window.iexapikey}`
    })
)

export const fetchStockYear = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/1y?token=${window.iexapikey}`
    })
)

export const fetchStockFiveYears = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/5y?token=${window.iexapikey}`
    })
)

export const fetchNews = () => (
    $.ajax({
        url: `/api/news`
    })
)

export const fetchSnapshots = (userId) => (
    $.ajax({
        url: `/api/portfolio_snapshots`,
        data: { userId }
    })
)