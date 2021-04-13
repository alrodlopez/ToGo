import axios from '../../../axios/axios'

export function getDetalles ({ commit }) {
  axios.get('togo/detalles').then(response => {
    commit('setDetalles', response.data.data)
  }).catch(error => {
    console.log(error)
  })
}

export function addDetalle({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.post('togo/detalle',data).then( response =>{
            resolve(response)
            dispatch('getDetalles')
        }).catch(error =>{
            reject(error)
        })
    })
}

export function editDetalle({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.put(`togo/detalle/${data.id}`,{
            nombre: data.nombre,
            producto_id: data.producto_id,
        }).then(response =>{
            resolve(response)
            dispatch('getDetalles')
        }).catch(error => {
            reject(error)
        })
    })
}

export function deleteDetalle({dispatch},idDetalle){
    return new Promise((resolve, reject)=>{
        axios.delete(`togo/detalle/${idDetalle}/destroy`).then(response => {
            resolve(response)
            dispatch('getDetalles')
        }).catch(error =>{
            reject(error)
        })
    })
}