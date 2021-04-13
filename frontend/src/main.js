import Vue from 'vue'
import App from './App'
import router from './config/router'
import store from './config/store'
import LoadScript from 'vue-plugin-load-script';

//Laravel-echo
import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'anyKey',
  //cluster: process.env.MIX_PUSHER_APP_CLUSTER,
  //encrypted: true, 
  // password ssh hostgator: jE,k?}&N0.^F
  wsHost: window.location.hostname,
  //wssHost: 'https://api.togobolivia.com/api/',
  wsPort: 6001,
  disableStats: true,
  forceTLS: false,
  encrypted:false,
  enabledTransports: ['ws'],
  //authEndpoint: window.location.hostname+':8000/api/broadcasting/auth',
  auth: {
    headers: {
        /** I'm using access tokens to access  **/
      //  Accept: 'application/json',
       // 'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access_token')
      // 'XSRF-TOKEN':  localStorage.getItem('access_token')
    }
  }
});


/*Vuepaginate*/
import VuePaginate from 'vue-paginate';

/*Antd*/
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';


/*Jquery*/
window.$ = window.jQuery = require("jquery");

/*SweetAlert*/
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

/*Vuelidate*/
import Vuelidate from "vuelidate";

/**Mapa leaflet lite */
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LControlZoom } from 'vue2-leaflet';

import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/*using components*/
Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-control-zoom', LControlZoom);


/*using components*/
Vue.use(LoadScript);
Vue.use(Antd)
Vue.use(VueSweetalert2);
Vue.use(VuePaginate);
Vue.use(Vuelidate);

Vue.loadScript('/static/assets/js/app.min.js')
Vue.loadScript('/static/assets/js/theme/default.min.js')

require("./config/store/subscriber");

store.dispatch('auth/attempt', localStorage.getItem('access_token')).then( () => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount("#app")
})
