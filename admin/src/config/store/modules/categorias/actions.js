import axios from '../../../axios/axios'

export function getCategorias({ commit }){
    axios.get('togo/categorias').then( response => {
        commit('setCategorias', response.data.data);
    }).catch( error => {
        console.log(error);
    })
}

export function storeCategoria({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.post('togo/categoria', data).then( response =>{
            resolve(response);
            dispatch('getCategorias');
        }).catch(error =>{
            reject(error);
        })
    })
}

export function updateCategoria({ dispatch }, data){
    return new Promise((resolve, reject) =>{
        axios.put(`togo/categoria/${data.id}`, {
            nombre: data.nombre
        }).then( response =>{
            resolve(response);
            dispatch('getCategorias');
        }).catch(error =>{
            reject(error);
        })
    })
}

export function deleteCategoria({ dispatch }, idCategoria){
    return new Promise((resolve, reject) =>{
        axios.delete(`togo/categoria/${idCategoria}/destroy`).then( response =>{
            resolve(response);
            dispatch('getCategorias');
        }).catch(error =>{
            reject(error);
        })
    })
}

