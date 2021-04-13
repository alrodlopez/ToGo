import axios from 'axios'
import store from '../store'
import router from '../router'
import * as utils from '../../utils/utils'

axios.defaults.baseURL='http://127.0.0.1:8000/api/'

axios.interceptors.response.use((response) => {
    return response;
},(error) => {

    if (store.getters['auth/user'] != null && error.response.status == 401){

        utils.alerta(
            "Sesión expirada",
            "Su sesión ha caducado. Será redirigido a la página de inicio de sesión",
            "warning"
        ).then( () => {
            store.dispatch('auth/logout');
            window.location = '/login';
        })

    }
    if ( error.response.status == 500){
        utils.alerta(
            "Error en el Servidor",
            "Error al realizar la accion, consulte al Administrador",
            "error"
        );
    }

    return Promise.reject(error);

});

export default axios;


