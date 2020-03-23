export const createNewHolding = holding => (
    $.ajax({
        url: "/api/holdings",
        method: "POST",
        data: { holding }
    })
);

export const indexHoldings = (holding) => {
    // debugger
    return $.ajax({
        url: `/api/holdings/`,
        method: "GET",
        data: { holding }
    })
};

export const showHolding = (holding) => (
    $.ajax({
        url: `/api/holdings/:id`,
        method: "GET",
        data: { holding }
    })
);

export const updateUserBuyingPower = (holding) => (
    $.ajax({
        url: `/api/users/${holding.user_id}`,
        method: "PATCH",
        data: { holding }
    })
);