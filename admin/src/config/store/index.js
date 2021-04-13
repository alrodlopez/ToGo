import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import restaurantes from './modules/restaurantes'
import categorias from './modules/categorias'
import repartidores from './modules/repartidores'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        auth,
        restaurantes,
        categorias,
        repartidores
    },
    strict: true,
})

