import axios from '../../../axios/axios'

export function getRestaurantes({ commit }){
    axios.get('togo/restaurantes').then( response => {
        commit('setRestaurantes', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}
export function storeRestaurante({ dispatch }, data){
    return new Promise((resolve, reject) => {
        axios.post('togo/restaurante', data).then( response =>{
            resolve(response);
            dispatch('getRestaurantes');
        }).catch(error => {
            reject(error);
        })
    })
}

/*export function storeRestaurante({ dispatch }, data){
    let formData = new FormData();
    const config = { headers: { 'content-type': 'multipart/form-data' } }
    formData.append('nombre', data.nombre);
    formData.append('direccion', data.direccion);
    formData.append('telefono', data.telefono);
    formData.append('descripcion', data.descripcion);
    formData.append('email', data.email);
    formData.append('logo', data.logo);
    //formData.append('direccion', data.direccion);
    formData.append('ubicacion[latitude]', data.ubicacion.latitude);
    formData.append('ubicacion[longitude]', data.ubicacion.longitude);
    for (let index = 0; index < data.categorias.length; index++) {
        formData.append('categorias[]', data.categorias[index]);
    }
    return new Promise((resolve, reject) =>{
        axios.post('togo/restaurante', formData, config).then( response => {
            resolve(response);
            dispatch('getRestaurantes');
        }).catch( error => {
            reject(error);
        })
    })
}*/

export function updateRestaurante({ dispatch }, data){
    let formData = new FormData();
    const config = { headers: { 'content-type': 'multipart/form-data' } };
    formData.append('_method', 'PATCH');
    formData.append('nombre', data.nombre);
    formData.append('direccion', data.direccion);
    formData.append('telefono', data.telefono);
    formData.append('descripcion', data.descripcion);
    formData.append('email', data.email);
    formData.append('logo', data.logo);
    formData.append('direccion', data.direccion);
    formData.append('estado', 0);
    formData.append('ubicacion[latitude]', data.ubicacion.latitude);
    formData.append('ubicacion[longitude]', data.ubicacion.longitude);
    for (let index = 0; index < data.categorias.length; index++) {
        formData.append('categorias[]', data.categorias[index]);
    }
    return new Promise((resolve, reject) =>{
        axios['post'](`togo/restaurante/${data.id}`, formData, config).then( response => {
            resolve(response);
            dispatch('getRestaurantes');
        }).catch( error => {
            reject(error);
        })
    })
}

export function deleteRestaurante({ dispatch }, idRestaurante){
    return new Promise((resolve, reject) =>{
        axios.delete(`togo/restaurante/${idRestaurante}/destroy`).then( response =>{
            resolve(response);
            dispatch('getRestaurantes');
        }).catch(error =>{
            reject(error);
        })
    })
}
