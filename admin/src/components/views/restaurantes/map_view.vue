<template>
    <div>
        <div class="row">
            <div class="col-xl-6">
                <h4 class="card-title mb-4">Seleccione la ubicación en el mapa</h4>
            </div>
            <div class="col-xl-6 text-right">
                <button @click="draggable = true" class="btn btn-sm btn-primary">Cambiar ubicacion</button>
            </div>
        </div>
        <div class="row m-1 mb-4" v-if="draggable">
            <a-alert
                message="Info"
                description="Para poder cambiar su ubicación, mover el marcador hasta la nueva dirección deseada."
                type="info"
                show-icon
            />
        </div>
        <div class="row m-1 mb-4">
            <l-map
                :zoom="zoom"
                :center="[ubicacion.latitude, ubicacion.longitude]"
                :options="mapOptions"
                style="height: 300px"
            >
                <l-tile-layer :url="url" :attribution="attribution"/>
                <l-marker
                    ref="marker"
                    :draggable="draggable"
                    :lat-lng="[ubicacion.latitude, ubicacion.longitude]"
                    @dragend="setMarker"
                >
                    <!-- <l-popup v-if="restaurante">
                        <p><strong>Dirección Actual</strong></p>
                        <p>{{ datos.direccion }}</p>
                    </l-popup> -->
                </l-marker>
            </l-map>
        </div>
    </div>
</template>
<script>
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LControlZoom } from 'vue2-leaflet';
export default {
    name: 'MapViewPage',
    props: {
        ubicacion: {
            type: Object,
            required: true,
            latitude: '-16.5206657',
            Longitude: '-68.2641639'
        }
    },
    data () {
        return {
            zoom: 13,
            draggable: false,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            mapOptions: {
                zoomSnap: 0.1
            },
        }
    },
    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip,
        LControlZoom
    },
    methods: {
        setMarker(e){
            this.ubicacion.latitude = e.target.getLatLng().lat;
            this.ubicacion.longitude = e.target.getLatLng().lng;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$refs.marker.mapObject.openPopup();
        })
    },
}
</script>
