export const signup = (formUser) => {
    return $.ajax({
        url: "api/users/",
        method: "POST",
        data: { user: formUser }
    })
};

export const login = (formUser) => (
    $.ajax({
        url: "api/session/",
        method: "POST",
        data: { user: formUser }
    })
);

export const logout = () => (
    $.ajax({
        url: "api/session",
        method: "DELETE"
    })
);