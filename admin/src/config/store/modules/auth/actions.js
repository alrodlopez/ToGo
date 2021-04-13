import axios from '../../../axios/axios'

export async function signIn({ dispatch }, credenciales) {
    let response = await axios.post('/admin/access/login', credenciales)
    return dispatch('attempt', response.data.access_token)
}

export async function attempt ({ commit, state }, token) {

    if (token) commit('SET_TOKEN', token)
    if (!state.token) return

    try {
        let response = await axios.get('admin/access/user')
        commit('SET_USER', response.data)
    } catch (error) {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
    }
}

export function logout({ commit }){

    return axios.post('admin/access/logout').then( () => {
        commit('SET_TOKEN', null)
        commit('SET_USER', null)
    })

}
