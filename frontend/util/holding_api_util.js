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

export const updateUserBuyingPower = (holding) => {
    return $.ajax({
        url: `/api/users/${holding.user_id}`,
        method: "PATCH",
        data: { holding }
    })
}