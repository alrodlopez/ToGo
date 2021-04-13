<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-lg-12 col-xl-12 pb-0">
                <div class="panel">
                    <div class="panel-body" style="height: 300px;">
                       <l-map
                            v-if="showMap"
                            :zoom="zoom"
                            :center="center"
                            :options="mapOptions"
                            style="height: 100%"
                            @update:center="centerUpdate"
                            @update:zoom="zoomUpdate"
                        >
                            <l-tile-layer :url="url" :attribution="attribution"/>
                            <l-marker v-for="pedido in pedidos" :key="pedido.id" :lat-lng="latlng(pedido.orden.ubicacion.latitude, pedido.orden.ubicacion.longitude)">
                                <l-popup>
                                    <div @click="innerClick">
                                        {{ pedido.orden.direccion }}
                                        <p v-show="true">
                                        {{ pedido.orden.referencia }}
                                        </p>
                                    </div>
                                </l-popup>
                            </l-marker>
                            <l-control-zoom position="bottomright"  ></l-control-zoom>
                        </l-map>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="panel">
                    <div class="panel-body">
                        <div class="input-group">
                            <span class="input-group-append">
                                <button class="btn btn-yellow" type="button"><i class="fa fa-search"></i></button>
                            </span>
                            <input type="text" class="form-control bg-light" placeholder="Buscar">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">

            <div v-for="(pedido, index) in pedidos" :key="pedido.id" class="col-lg-6 col-md-6 col-xl-4 col-xs-12 col-sm-12">
                <div class="panel">
                    <div class="panel-heading"  style="background-color: #ffd900">
                        <h4 class="panel-title">{{ pedido.cliente.nombre }} {{ pedido.cliente.apellidos }}</h4>
                        <div class="panel-heading-btn">
                            <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>

                        </div>
                    </div>
                    <div class="panel-body ">
                        <div class="row">
                            <div class="media-body media-left">
                                <h3><b class="text-inverse">(+591) {{ pedido.cliente.telefono }}</b></h3>
                                <span style="font-size: 12px"><b class="text-inverse">Direccion:</b> {{ pedido.orden.direccion }}</span><br>
                                <span style="font-size: 12px"><b class="text-inverse">Referencia:</b> {{ pedido.orden.referencia }}</span><br>
                                <span style="font-size: 12px"><b class="text-inverse">Carnet:</b> {{ pedido.cliente.ci }}</span><br>
                                <span style="font-size: 12px"><b class="text-inverse">Detalle:</b> <a href="#"  @click="openModalDetalle(pedido.orden.pedido_id)" class="btn btn-yellow mx-2"><i class="fas fa-eye"></i></a></span>
                                <span style="font-size: 12px"><b class="text-inverse">Asignar Repartidor:</b> <a href="#"  @click.prevent="onOpenModal(pedido.orden.pedido_id)" class="btn btn-yellow mx-2"><i class="fas fa-motorcycle"></i></a></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal
            :width="800"
            :visible="showDetalle"
            :destroyOnClose="true"
            :maskClosable="false"
            :centered="false"
            @cancel="showDetalle=false"
            @ok="showDetalle=false"
            :header="null"
        >
            <detalle-component :idPedido="pedido_id"></detalle-component>
        </a-modal>
        <a-modal
            :visible="show"
            :destroyOnclose="true"
            :maskClosable="true"
            :centered="false"
            @cancel="show=false"
            :header="null"
            :footer="null"
        >
            <div class="body">
                <asignar-form @close_modal="onCloseModal" :idPedido="idpedido"></asignar-form>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { latLng } from 'leaflet'
import { mapGetters, mapActions } from 'vuex'
import Detalle from './detalle'
import asignar from './asignar'
export default {
  name: "IndexView",
    data() {
        return {
            search:'',
            entregado:'',
            idpedido:'',
            show:false,
            lat: '',
            lng: '',
            zoom: 10,
            center: latLng(-17.957639,-67.104725),
            url: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ec467e34aa554ac1803b889e694edce7',
            attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            withPopup: latLng(-17.957639,-67.104725),
            withTooltip: latLng(-17.957639,-67.104725),
            currentZoom: 10,
            currentCenter: latLng(-17.957639,-67.104725),
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.1
            },
            showMap: true,
            showDetalle: false,
            pedido_id: '',
        };
    },
    components: {
        'detalle-component': Detalle,
        'asignar-form': asignar
    },
    computed:{
        ...mapGetters('pedidos', ['pedidos']),
        ...mapGetters('auth',['user'])
    },
    methods: {
        ...mapActions('pedidos', ['getPedidos']),

        latlng(lat, lng){
            return latLng(lat, lng);
        },
        zoomUpdate(zoom) {
            this.currentZoom = zoom;
        },
        centerUpdate(center) {
            this.currentCenter = center;
        },
        showLongText() {
            this.showParagraph = !this.showParagraph;
        },
        innerClick() {
            alert("Click!");
        },
        openModalDetalle(id){
            this.showDetalle = true;
            this.pedido_id = id;
        },
        onOpenModal(idpedido){
            this.idpedido=idpedido,
            this.show = true
        },
        onCloseModal(){
            this.show = false
        },
        filtrarAsignado(){


        },
        buscarCliente(){
            this.pedidos.filter((pedido) => {
                return pedido.cliente.cliente_id.toLowerCase().match(this.search)
            })
        }
    },
    mounted(){
        this.getPedidos(this.user.restaurante)
    }
};
</script>

