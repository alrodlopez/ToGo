import axios from '../../../axios/axios'

export function getCategorias({ commit }){
    axios.get('togo/categorias').then( response => {
        commit('setCategorias', response.data.data)
    }).catch( error => {
        console.log(error)
    })
}