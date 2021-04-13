export function SET_TOKEN (state, token) {
  state.token = token
}

export function SET_USER (state, data) {
  state.user = data
}

export function destroyToken (state) {
  state.token = null;
}

export function setErrors(state, payload){
  state.errors = payload;
}
