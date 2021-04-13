import Vue from 'vue';

export function cambiarEstado({ commit }, payload){
  return new Promise((resolve, reject) =>{
    Vue.prototype.$axios.patch(`togo/repartidor/cambiar-estado/${payload.idRepartidor}`, {
      estado: payload.estado,
      ubicacion: payload.ubicacion
    }).then( response => {
      commit('setRepartidor', response.data.data)
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}
