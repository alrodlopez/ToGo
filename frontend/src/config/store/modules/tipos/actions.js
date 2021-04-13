import axios from '../../../axios/axios'

export function getTipos({ commit }){
    axios.get('togo/tipos').then( response => {
        commit('setTipos', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}

export function addTipo({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.post('togo/tipo', {
            nombre: data.nombre,
        }).then( response => {
            resolve(response)
            dispatch('getTipos')
        }).catch( error => {
            reject(error)
        })
    })
}

export function editTipo({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.put(`togo/tipo/${data.id}`, {
            nombre: data.nombre,
        }).then( response => {
            resolve(response)
            dispatch('getTipos')
        }).catch( error => {
            reject(error)
        })
    })
}

export function deleteTipo({ dispatch }, idTipo){
    return new Promise((resolve, reject) => {
        axios.delete(`togo/tipo/${idTipo}/destroy`).then( response => {
            resolve(response)
            dispatch('getTipos')
        }).catch( error => {
            reject(error)
        })
    })
}
