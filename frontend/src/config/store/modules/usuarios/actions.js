import axios from '../../../axios/axios'

export function getUsuarios({ commit }, idRestaurante){
    axios.get(`togo/usuarios/${idRestaurante}`).then( response => {
        commit('setUsuarios', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}

export function addUsuario({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.post('togo/usuario', {
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            restaurante_id: data.id_restaurante,
            roles: data.rol_id,
        }).then( response => {
            resolve(response)
            dispatch('getUsuarios')
        }).catch( error => {
            reject(error)
        })
    })
}

export function ModificarUsuario({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.put(`togo/usuario/${data.id}`, {
            password: data.password,
            password_confirmation: data.password_confirmation,
        }).then( response => {
            resolve(response)
            dispatch('getUsuarios')
        }).catch( error => {
            reject(error)
        })
    })
}

export function editUsuario({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.put(`togo/usuario/${data.id}`, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            telefono: data.telefono,
            email: data.email,
            roles: data.rol_id,
            restaurante_id: data.id_restaurante,
        }).then( response => {
            resolve(response)
            dispatch('getUsuarios')
        }).catch( error => {
            reject(error)
        })
    })
}

export function deleteUsuario({ dispatch }, idUsuario){
    return new Promise((resolve, reject) => {
        axios.delete(`togo/usuario/${idUsuario}/destroy`).then( response => {
            resolve(response)
            dispatch('getUsuarios')
        }).catch( error => {
            reject(error)
        })
    })
}
