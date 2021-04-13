import Vue from 'vue';

//Lista pedidos en general
export function getPedidos({ commit }){
  Vue.prototype.$axios.get('togo/pedidos').then( response => {
    commit('setPedidos', response.data.data)
  }).catch( error => {
      console.log(error)
  })
}

// Lista los pedidos del repartidor logueado
export function getPedidosRepartidor({ commit }, idRepartidor){
  return new Promise((resolve, reject) =>{
    Vue.prototype.$axios.get(`togo/repartidor/entregas/${idRepartidor}`).then( response => {
      commit('setPedidos', response.data.data.entregas)
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}

// obtiene los datos de un pedido especifico
export function getPedido({ commit }, idPedido){
  return new Promise((resolve, reject) =>{
    Vue.prototype.$axios.get(`togo/pedido/${idPedido}`).then( response => {
      commit('setPedido', response.data.data)
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}

// cambia el estado de un pedido a entregado
export function entregarPedido({ dispatch }, payload){
  return new Promise((resolve, reject) =>{
    Vue.prototype.$axios.patch(`togo/entrega/cambiar-estado/${payload.idEntrega}`).then( response => {
      dispatch('getPedidosRepartidor', payload.idRepartidor)
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}
