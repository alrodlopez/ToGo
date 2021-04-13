import Vue from 'vue'
import Vuex from 'vuex'
import authModule from './modules/auth'
import pedidos from './modules/pedidos'
import repartidor from './modules/repartidor'
import togo from './modules/togo'
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      authModule,
      pedidos,
      repartidor,
      togo
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
