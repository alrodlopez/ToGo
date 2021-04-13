import axios from '../../../axios/axios'

export function getRestaurante({ commit } ,idRestaurante ){
    axios.get(`togo/restaurante/${idRestaurante}`).then( response => {
        commit('setRestaurante', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}

export function editRestaurante({ dispatch }, data){
    //data.getAll("id")
    return new Promise((resolve, reject)=> {
        axios({
               method: 'post',
              // _method:'put',
               url: `togo/restaurante/${data.getAll("id")}`,
               headers: {'Content-type': 'multipart/form-data'},
               data: data,
               
       
            }
        )
        .then( response => {
            resolve(response)
            dispatch('getRestaurante')
        }).catch( error => {
            reject(error)
        })
    })
}

export function cambiarEstado({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.patch(`togo/restaurante/cambiar-estado/${data.id}`, {
            estado: data.estado,
        }).then( response => {
            resolve(response)
            dispatch(getRestaurante(data.id))
        }).catch( error => {
            reject(error)
        })
    })
}