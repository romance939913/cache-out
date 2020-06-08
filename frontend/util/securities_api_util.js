export const fetchStocks = () => (
    $.ajax({
        url: '/api/stocks',
        method: "GET"
    })
)

export const fetchProfile = (company) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/company?token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)

export const fetchFinancials = (company) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTR/financials?period=annual&token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)

export const fetchRealTimePrice = (company) => (
    $.ajax({
        url: `https://sandbox.iexapis.com/stable/stock/TWTRcompany/price?token=Tsk_8b8700fde9b94bc382719cb416f0d336`,
        method: "GET"
    })
)