export const fetchStockDay = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/intraday-prices?token=${window.iexapikey2}`
    })
)

export const fetchStockWeek = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5d?token=${window.iexapikey2}`
    })
)

export const fetchStockMonth = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1m?token=${window.iexapikey2}`
    })
)

export const fetchStockThreeMonths = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/3m?token=${window.iexapikey2}`
    })
)

export const fetchStockYear = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/1y?token=${window.iexapikey2}`
    })
)

export const fetchStockFiveYears = (ticker) => (
    $.ajax({
        url: `https://cloud.iexapis.com/stable/stock/${ticker}/chart/5y?token=${window.iexapikey2}`
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