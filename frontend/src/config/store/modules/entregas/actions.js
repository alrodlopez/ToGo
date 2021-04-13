import axios from '../../../axios/axios'

export function getEntregas({ commit }){
    return new Promise((resolve, reject) => {
        axios.get('togo/entregas').then( response => {
            commit('setEntregas',response.data.data)
        }).catch( error => {
            reject(error)
        })
    })
}

export function asignarEntrega({ dispatch }, payload ){
    return new Promise((resolve, reject) =>{
        axios.post('togo/entrega',{
            repartidor_id: payload.idRepartidor,
            pedido_id: payload.idPedido,
        }).then( response => {
           // dispatch('getEntregas')
            resolve(response)
            console.log(response)
        }).catch(error =>{
            reject(error)
        })
    })
}

