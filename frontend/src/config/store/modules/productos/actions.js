import axios from '../../../axios/axios'
let idRest
export function getProductos ({ commit }, idRestaurante) {
  axios.get('togo/productos',{
      params: {
          id: idRestaurante
      }
  }).then(response => {
    commit('setProductos', response.data.data)
    idRest = idRestaurante;
  }).catch(error => {
    console.log(error)
  })
}

export function addProducto({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.post('togo/producto',data).then( response =>{
            resolve(response)
            dispatch('getProductos', idRest)
        }).catch(error =>{
            reject(error)
        })
    })
}

export function editProducto({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.put(`togo/producto/${data.id}`,{
            nombre: data.nombre,
            imagen: data.imagen,
            descripcion: data.descripcion,
            precio: data.precio,
            restaurante_id: data.restaurante_id,
            tipo_id: data.tipo_id,
        }).then(response =>{
            resolve(response)
            dispatch('getProductos', idRest)
        }).catch(error => {
            reject(error)
        })
    })
}

export function deleteProducto({dispatch},idProducto){
    return new Promise((resolve, reject)=>{
        axios.delete(`togo/producto/${idProducto}/destroy`).then(response => {
            resolve(response)
            dispatch('getProductos', idRest)
        }).catch(error =>{
            reject(error)
        })
    })
}


export function getMasVendidos({commit}){
    axios.get('togo/mas-vendidos').then(response => {
        commit('setMasVendidos', response.data)
      }).catch(error => {
        console.log(error)
      })
}
