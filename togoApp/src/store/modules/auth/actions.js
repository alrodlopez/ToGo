import Vue from 'vue';

export async function signIn({ dispatch }, credenciales) {
  let response = await Vue.prototype.$axios.post('/admin/access/login', credenciales)
  return dispatch('attempt', response.data.access_token)
}

export async function attempt ({ commit, state }, token) {

  if (token) {
    commit('SET_TOKEN', token)
  }
  if (!state.token) {
    return
  }

  try {
    let response = await Vue.prototype.$axios.get('/admin/access/user')
    commit('SET_USER', response.data)
  } catch (error) {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
  }
}

export function logout({ commit }){

  return Vue.prototype.$axios.post('admin/access/logout').then( () => {
    commit('SET_TOKEN', null)
    commit('SET_USER', null)
  })

}

export function updateProfile({ commit }, payload){
  return new Promise((resolve, reject) => {
    Vue.prototype.$axios.put('profile', {
      name: payload.name,
      email: payload.email,
      avatar: payload.avatar,
      roles: 'administrador'
    }).then( response => {
      commit('SET_USER', response.data.user)
      resolve(response)
    }).catch(error => {
      reject(error)
    })
  })
}

export function changePassword(_, payload){
  return Vue.prototype.$axios.put('admin/access/password', {
    current_password: payload.current_password,
    password: payload.password,
    password_confirmation: payload.confirm_password
  })
}



// loggin
// return new Promise((resolve, reject) => {
//   Vue.prototype.$axios.post('auth/logout').then(response => {
//     localStorage.removeItem('access_token')
//     commit('SET_TOKEN', null)
//     commit('SET_USER', null)
//     resolve(response)
//   }).catch(error => {
//     localStorage.removeItem('access_token')
//     commit('SET_TOKEN', null)
//     commit('SET_USER', null)
//     reject(error)
//   })
// })
// export function login ({ commit }, payload) {
//   return new Promise((resolve, reject) => {
//     Vue.prototype.$axios.post('login', {
//       email: payload.email,
//       password: payload.password
//     }).then(response => {
//       var token = response.data.access_token;
//       localStorage.setItem('token', token);
//       commit('setToken', token);

//       resolve(response);

//     }).catch( error => {
//       //console.log(error.response);

//       commit('setErrors', error.response.data.errors);
//       reject(error.response.data.errors);

//       //console.log(error.response.status);
//       //commit('setErrors', error.response.data.errors);
//     })
//   });
// }
