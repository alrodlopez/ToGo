import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import tipos from './modules/tipos'
import restaurante from './modules/restaurante'
import categorias from './modules/categorias'
import productos from './modules/productos'
import usuarios from './modules/usuarios'
import repartidores from './modules/repartidores'
import pedidos from './modules/pedidos'
import entregas from './modules/entregas'
import detalles from './modules/detalles'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        auth,
        tipos,
        productos,
        usuarios,
        repartidores,
        restaurante,
        categorias,
        pedidos,
        entregas,
        detalles,
    },
    strict: true,
})

