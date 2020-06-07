export const fetchStockDay = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/intraday-prices?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
    })
)

export const fetchStockWeek = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/5d?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
    })
)

export const fetchStockMonth = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/1m?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
    })
)

export const fetchStockThreeMonths = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/3m?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
    })
)

export const fetchStockYear = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/1y?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
    })
)

export const fetchStockFiveYears = (ticker) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/chart/5y?token=Tsk_8b8700fde9b94bc382719cb416f0d336`
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