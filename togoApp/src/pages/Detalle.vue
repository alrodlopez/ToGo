<template>
  <q-page >
    <div class="column full-height map-wrapper">
      <div class="col-auto" style="margin-bottom: -20px;">
        <q-card flat bordered class="bg-primary">
          <q-card-section>
            <q-item-label class="text-center text-white">TOTAL</q-item-label>
            <q-item-label class="text-center text-white text-weight-bold" style="font-size: 35px">{{ orden.total }}</q-item-label>
            <q-item-label class="text-center text-white">FECHA DE ENTREGA</q-item-label>
            <q-item-label class="text-center text-white" caption>{{ orden.fecha }}</q-item-label>
          </q-card-section>

        </q-card>
        <q-card flat bordered  class="q-ma-xs">
          <q-card-section>
            <div class="row q-gutter-xs">
              <div class="col q-ma-xs">
                <q-btn icon="send" rounded class="full-width" color="primary"> NOTIFICAR</q-btn>
              </div>
              <div class="col q-ma-xs">
                <q-btn icon="phone" rounded class="full-width" color="primary"> LLAMAR</q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col map">
        <l-map
            :zoom="zoom"
            :center="latlng(latitud, longitud)"
        >
          <l-tile-layer :url="url" :attribution="attribution"/>
          <l-marker ref="marker" :lat-lng="latlng(latitud, longitud)">
            <l-popup :lat-lng="latlng(latitud, longitud)" style="width: 1500px;">
              <q-item-label>Datos Cliente</q-item-label>
              <!-- {{ cliente.nombre }} {{ cliente.apellidos }} -->
              <q-item-label caption><q-icon name="person" /> {{ cliente.nombre }} {{ cliente.apellidos }}</q-item-label>
              <q-item-label caption><q-icon name="home" /> {{ orden.direccion }}</q-item-label>
              <q-item-label caption><q-icon name="phone" /> {{ cliente.telefono}} </q-item-label>
            </l-popup>
          </l-marker>
          <l-marker :lat-lng="latlng(miUbicacion.latitud, miUbicacion.longitud)"></l-marker>
          <l-control-zoom position="bottomright"  ></l-control-zoom>
        </l-map>
      </div>
    </div>
    <q-page-sticky position="bottom" vertical-actions-align="center" :offset="[10,10]">
      <q-btn fab color="primary" padding="sm" label="ENTREGAR PEDIDO" style="width: 320px;" @click.prevent="confirmar()"/>
    </q-page-sticky>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker, LPopup, LControlZoom } from 'vue2-leaflet';
import { latLng, Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
export default {
  name: 'DetallePage',
  data() {
    return {
      zoom: 2,
      currentZoom: 2,
      url: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ec467e34aa554ac1803b889e694edce7',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      fabCenter: true,
      orden: {},
      cliente: {},
      entrega: {},
      latitud: '',
      longitud: ''
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControlZoom
  },
  computed:{
    ...mapGetters('pedidos', ['pedido']),
    ...mapGetters('togo', ['driverStatus', 'miUbicacion'])

  },
  methods: {
    ...mapActions('pedidos', ['getPedido', 'entregarPedido']),
    cargarDatos(){
      this.getPedido(this.$route.params.id).then( response => {
        this.orden = response.data.data.orden
        this.cliente = response.data.data.cliente
        this.entrega = response.data.data.entrega
        this.latitud = response.data.data.orden.ubicacion.latitude
        this.longitud = response.data.data.orden.ubicacion.longitude
      }).catch( (error) => {
        console.log(error)
      })
    },
    latlng(lat, lng){
        return latLng(lat, lng);
    },
    entregar(){
      let payload = {
        idEntrega: this.entrega.id,
        idRepartidor: this.entrega.repartidor_id
      }
      this.entregarPedido(payload).then( response => {
        this.$router.push({ name: 'Entregas'})
        this.$q.notify({
          message: 'El pedido ha sido registrado como entregado',
          type: 'positive',
          position: 'top',
          multiLine: true,
        })
      }).catch(error => {
        console.log(error)
      })
    },
    confirmar() {
      this.$q.dialog({
        dark:false,
        html: true,
        title: 'Confirmar',
        message: '¿Esta seguro de realizar la accion?',
        ok: {
          push: true,
          color: 'positive',
          icon: 'check',
          size: 'sm',
          rounded: true
        },
        cancel: {
          push: true,
          icon: 'cancel',
          size: 'sm',
          color: 'negative',
          rounded: true
        },
        persistent: true
      }).onOk(() => {
        this.entregar()
      }).onCancel(() => {

      }).onDismiss(() => {

      })
    },
  },
  mounted() {
    this.cargarDatos()
    this.$nextTick(() => {
      this.$refs.marker.mapObject.openPopup()
    })
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
  },
}
</script>
<style scoped>
.map-wrapper {
  width: 100%;
  height:100%;
  position: fixed;
}
.map {
  width: 100%;
  height:100%;
}
</style>
