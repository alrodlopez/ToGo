import axios from '../../../axios/axios'

export function getRepartidores({ commit }){
    axios.get('togo/repartidores').then( response => {
        commit('setRepartidores', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}

export function datosRepartidor({ commit }, idRepartidor){
    return new Promise((resolve, reject) => {
        axios.get(`togo/repartidor/${idRepartidor}`).then(response => {
            commit('setRepartidor',response.data.data)
        }).catch( error => {
            console.log(error)
        })
    })
}

export function addRepartidor({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.post('togo/repartidor', {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            nit: data.nit,
            ruat: data.ruat,
            password: data.password,
            password_confirmation: data.password_confirmation
        }).then( response => {
            resolve(response)
            dispatch('getRepartidores')
        }).catch( error => {
            reject(error)
        })
    })
}

export function editRepartidor({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.put(`togo/repartidor/${data.user_id}`, {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            nit: data.nit,
            ruat: data.ruat
        }).then( response => {
            resolve(response)
            dispatch('getRepartidores')
        }).catch( error => {
            reject(error)
        })
    })
}

export function deleteRepartidor({ dispatch }, idRepartidor){
    return new Promise((resolve, reject) => {
        axios.delete(`togo/repartidor/${idRepartidor}/destroy`).then( response => {
            resolve(response)
            dispatch('getRepartidores')
        }).catch( error => {
            reject(error)
        })
    })
}

export function entregasRepartidor({ commit }, idRepartidor){
    return new Promise((resolve, reject) => {
        axios.get(`togo/repartidor/entregas/${idRepartidor}`).then( response => {
            resolve(response)
            commit('setEntregas', response.data.data)
        }).catch( error => {
            reject(error)
        })
    })
}


export function asignarRepartidor({ dispatch }, idRepartidor){
    return new Promise((resolve, reject) =>{
        axios.put(`togo/repartidor/switch-off/${idRepartidor}`).then(response => {
            resolve(response)
            dispatch('getRepartidores')
        }).catch(error => {
            reject(error)
        })
    })
}
