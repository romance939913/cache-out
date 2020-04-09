import { login, logout, signup } from '../util/session_api_util'

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS"

const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
})

const receiveErrors = (errorsArr) => ({
    type: RECEIVE_ERRORS,
    errorsArr
})

const clearTheSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
})

export const loginUser = (formUser) => dispatch => login(formUser)
    .then(user => dispatch(receiveCurrentUser(user)), pojo => dispatch(receiveErrors(pojo.responseJSON)))

export const logoutUser = () => dispatch => logout()
    .then(() => dispatch(logoutCurrentUser()), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const signupUser = (formUser) => dispatch => signup(formUser)
    .then((user) => dispatch(receiveCurrentUser(user)), pojo => dispatch(receiveErrors(pojo.responseJSON)));

export const clearSessionErrors = () => dispatch(clearTheSessionErrors())
