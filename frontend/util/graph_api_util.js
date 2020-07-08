const moment = require('moment');

export const fetchStockDay = (ticker) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/historical-chart/5min/${ticker}?apikey=${window.stockapikey}`
    })
)

export const fetchStockWeek = (ticker) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/historical-chart/30min/${ticker}?apikey=${window.stockapikey}`,
    })
)

export const fetchstockHistorical = (ticker) => {
    let date = new Date();
    let today = moment(date).format('YYYY-MM-DD');
    let fiveYearsAgo = moment().subtract(61, 'months').format('YYYY-MM-DD');
    return $.ajax({
        url: `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=${fiveYearsAgo}&to=${today}&apikey=${window.stockapikey}`,
    })
}

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