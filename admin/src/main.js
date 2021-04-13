import Vue from 'vue'
import App from './App'
import router from './config/router'
import store from './config/store'

import LoadScript from 'vue-plugin-load-script';

// /*Loading */
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// /*Antd*/
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';


/*Jquery*/
window.$ = window.jQuery = require('jquery');

/*Vue- noty*/
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'

/*SweetAlert*/
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/*Vuelidate*/
import Vuelidate from 'vuelidate'

/*leaflet */
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/*using components*/
Vue.use(LoadScript);
Vue.use(VueSweetalert2);
Vue.use(Vuelidate);
Vue.use(VueNoty, {
    killer: true,
    timeout: 4000,
    progressBar: true,
    layout: 'topRight'
})
Vue.use(Antd);
Vue.use(Loading);

Vue.loadScript('../static/assets/libs/bootstrap/js/bootstrap.bundle.min.js')
Vue.loadScript('../static/assets/libs/metismenu/metisMenu.min.js')
Vue.loadScript('../static/assets/libs/simplebar/simplebar.min.js')
Vue.loadScript('../static/assets/libs/node-waves/waves.min.js')
Vue.loadScript('../static/assets/js/app.js')

require("./config/store/subscriber");

store.dispatch('auth/attempt', localStorage.getItem('access_token')).then( () => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app")
})