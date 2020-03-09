export const createNewHolding = data => (
    $.ajax({
        url: "/api/holdings",
        method: "POST",
        data: { data }
    })
)

// export const updateHolding = data => (
//     $.ajax({
//         url: 
//     })
// )