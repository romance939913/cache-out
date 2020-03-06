export const fetchNasdaq = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/search?query=&limit=&exchange=NASDAQ`,
        method: "GET"
    })
)

export const fetchNYSE = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/search?query=&limit=&exchange=nyse`,
        method: "GET"
    })
);

export const fetchIndexes = () => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/majors-indexes`,
        method: "GET"
    })
)

export const fetchstockHistorical = (ticker) => {
    let d = new Date();
    return $.ajax({
        url: `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?from=2015-01-01&to=${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        method: "GET"
    })
}

export const fetchStockDay = (ticker) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/historical-chart/5min/${ticker}`,
        method: "GET"
    })
)

export const fetchProfile = (company) => (
    $.ajax({
        url: `https://financialmodelingprep.com/api/v3/company/profile/${company}`,
        method: "GET"
    })
)