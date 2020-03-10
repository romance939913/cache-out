export const createNewHolding = holding => (
    $.ajax({
        url: "/api/holdings",
        method: "POST",
        data: { holding }
    })
)

export const showHolding = (holding) => (
    $.ajax({
        url: `/api/holdings/${holding.id}`,
        method: "GET"
    })
)

export const updateUserBuyingPower = (user_id, buying_power) => (
    $.ajax({
        url: `/api/users/${user_id}`,
        method: "PATCH",
        data: { buying_power }
    })
)