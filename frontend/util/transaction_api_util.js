export const createNewTransaction = transaction => (
    $.ajax({
        url: "/api/transactions",
        method: "POST",
        data: { transaction }
    })
);

export const indexTransactions = creds => {
    return $.ajax({
        url: `/api/transactions/`,
        method: "GET",
        data: { creds }
    })
};
