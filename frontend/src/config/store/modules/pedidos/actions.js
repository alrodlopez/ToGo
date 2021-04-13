
import axios from '../../../axios/axios'

export function getPedidos({ commit }, idRestaurante){
    axios.get(`togo/pedidoRestaurante`,{
        params: {
            id: idRestaurante
        }
    }).then( response => {
        commit('setPedidos', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}

// Muestra el detalle de un pedido especifico
// enviandole el id

export function getPedido({ commit }, idPedido){
    return new Promise((resolve, reject) => {
        axios.get(`togo/pedido/${idPedido}`).then( response => {
            resolve(response)
            commit('setPedido', response.data.data)
        }).catch( error => {
            reject(error)
            console.log(error)
        })
    })
}


