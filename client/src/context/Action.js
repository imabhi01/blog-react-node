export const LoginStart = (credentials) => ({
    type: "LOGIN_START"
})

export const LoginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user
})

export const LoginFailure = () => ({
    type: 'LOGIN_FAILURE'
})

export const LOGOUT = () => ({
    type: 'LOGOUT'
})