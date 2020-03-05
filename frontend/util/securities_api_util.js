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
