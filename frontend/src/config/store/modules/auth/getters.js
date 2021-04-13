export function authenticated(state) {
    return state.token  != null
}

export function user(state) {
    return state.user
}
