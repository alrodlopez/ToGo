export function isLogged(state) {
  return state.token != null
}

export function currentUser(state) {
  return state.user
}

export function routes(state) {
  return state.routes
}
