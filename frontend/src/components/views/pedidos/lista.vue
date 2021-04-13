<template>
    <div>
        <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Escritorio</a></li>
            <li class="breadcrumb-item active">Pedidos</li>
        </ol>
        <h1 class="page-header">Pedidos<small> lista de pedidos registrados en el sistema</small></h1>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-xl-12">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="input-group mb-1 mr-2">
                                <div class="dropdown ml-2 mr-2">
                                    <a href="#" class="btn btn-yellow btn-white-without-border dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                        Filtrar por <b class="caret"></b>
                                    </a>
                                    <div class="dropdown-menu" role="menu" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 34px, 0px);">
                                       <!-- <a href="#" @click="tipo = ''" class="dropdown-item">Todos</a>-->
                                        <a href="#" @click="tipo = 'asignados'" class="dropdown-item">Pedidos asignados</a>
                                        <a href="#" @click="tipo = 'sin asignar'" class="dropdown-item">Pedidos sin asignar</a>
                                    </div>
                                </div>
                                <input type="text" class="form-control bg-light" placeholder="Ingrese palabras clave aquí...">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-info mr-1"><i class="fa fa-search fa-fw"></i> Buscar</button>
                                    <!-- <button type="button" class="btn btn-primary no-caret">
                                        <i class="fa fa-plus"> Nuevo</i>
                                    </button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">

            <div class="col-xl-12 col-lg-12 col-xs-12 col-sm-12 vld-parent">
                <loading :active.sync="isLoading"
                :can-cancel="false"
                :on-cancel="onCancel"
                :is-full-page="false"></loading>
                <div v-if="filtrarPedidos(tipo).length == 0" class="alert alert-info fade show m-b-10">
                    <i class="fa fa-info"></i> No existen <a href="#" class="alert-link">Pedidos </a>para el filtro seleccionado.
                </div>
            </div>

            <ul class="result-list" >
                <li v-for="(pedido, index) in filtrarPedidos(tipo)" :key="index">
                    <dir class="result-image" style="margin-top: 0px; margin-bottom: 0px;">
                        <l-map
                            v-if="showMap"
                            :zoom="zoom"
                            :center="[pedido.orden.ubicacion.latitude, pedido.orden.ubicacion.longitude]"
                            :options="mapOptions"
                            :scrollWheelZoom="false"
                            style="height: 100%; width:100%"
                        >
                            <l-tile-layer :url="url" :attribution="attribution"/>
                            <l-marker :lat-lng="[pedido.orden.ubicacion.latitude, pedido.orden.ubicacion.longitude]">
                                <l-popup>{{ pedido.cliente.telefono }}</l-popup>
                            </l-marker>
                        </l-map>
                    </dir>
                    <!-- <a href="#" class="result-image" style="background-image: url(static/assets/img/gallery/gallery-51.jpg)"></a> -->
                    <div class="result-info">
                        <!-- <h4 class="title"><a href="javascript:;"></a></h4> -->
                        <strong>Direccion:</strong><br />
                        <p class="location">
                            {{ pedido.orden.direccion }}
                        </p>
                        <p class="desc">
                            <strong>Referencia:</strong><br />
                            {{ pedido.orden.referencia }}
                        </p>
                        <div class="btn-row">
                            <a-tooltip placement="left">
                                <template slot="title">
                                    <span>Datos Cliente</span>
                                </template>
                                <a-popover trigger="click" >
                                    <template slot="content" >
                                        <div class="card-body">
                                            <h4 class="card-title m-t-0">{{ pedido.cliente.nombre }} {{ pedido.cliente.apellidos }}</h4>
                                            <h6 class="card-subtitle m-b-10 text-muted">Telefono: {{ pedido.cliente.telefono }}</h6>
                                            <h6 class="card-subtitle m-b-10 text-muted">Carnet de Identidad: {{ pedido.cliente.ci }}</h6>
                                            <h6 v-if="pedido.cliente.nit !== ''" class="card-subtitle m-b-10 text-muted">Número de Identifican Tributaria (Nit.): {{ pedido.cliente.nit }}</h6>
                                            <h6 v-if="pedido.cliente.nit == ''" class="card-subtitle m-b-10 text-muted"><span class="badge badge-danger">sin dato</span></h6>
                                        </div>
                                    </template>
                                    <button class="btn btn-default mr-1" ><i class="fa fa-fw fa-user"></i> Datos Cliente</button>
                                </a-popover>
                            </a-tooltip>
                            <a-tooltip placement="topLeft" v-if="tipo !== 'asignados'">
                                <template slot="title">
                                    <span>Asignar Repartidor</span>
                                </template>
                                <button  class="btn btn-default" @click.prevent="openModalAsignar(pedido.orden.pedido_id)"><i class="fa fa-fw fa-motorcycle"></i> Asignar Repartidor</button>
                            </a-tooltip>
                             <a-tooltip placement="right" v-if="tipo !== 'sin asignar'">
                                <template slot="title">
                                    <span>Datos Repartidor</span>
                                </template>
                                <a-popover trigger="click" >
                                    <template slot="content" >
                                        <div class="card-body">
                                            <h4 class="card-title m-t-0">{{ datoRepartidor.nombre }} {{ datoRepartidor.apellidos }}</h4>
                                            <h6 class="card-subtitle m-b-10 text-muted">Telefono: {{ datoRepartidor.telefono }}</h6>
                                            <h6 class="card-subtitle m-b-10 text-muted">Ruat: {{ datoRepartidor.ruat }}</h6>
                                            <h6 class="card-subtitle m-b-10 text-muted">Nit: {{ datoRepartidor.nit }}</h6>
                                        </div>
                                    </template>
                                    <button  class="btn btn-default" @click.prevent="datos(pedido.entrega.repartidor_id)"><i class="fa fa-fw fa-motorcycle"></i> Datos Repartidor</button>
                                </a-popover>
                            </a-tooltip>
                        </div>
                        <span v-if="pedido.entrega == null" class="label label-danger">Sin Asignar</span>
                        <span v-if="pedido.entrega !== null" class="label label-green">Asignado</span>
                    </div>
                    <div class="result-price" style="background-color: #dedede;">
                        Bs. {{ pedido.orden.total }}
                        <button @click="openModalDetalle(pedido.orden.pedido_id)" class="btn btn-yellow btn-block">Ver Detalle</button>
                    </div>
                </li>
            </ul>
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
            title="Asignar Repartidor"
            :visible="showAsignar"
            :destroyOnClose="true"
            :maskClosable="false"
            :centered="false"
            @cancel="showAsignar=false"

            :footer="null"
        >
            <asignar-component :idPedido="pedido_id" @closeModalAsignar="closeModalAsignar()"></asignar-component>
        </a-modal>
    </div>
</template>
<script>
import { latLng } from 'leaflet'
import { mapActions, mapGetters } from 'vuex'
import Detalle from './detalle'
import Asignar from './asignar'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
    name: "ListaPedidos",
    data() {
        return {
            zoom: 13,
            url: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ec467e34aa554ac1803b889e694edce7',
            attribution:
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            showParagraph: false,
            mapOptions: {
                zoomSnap: 0.1
            },
            showMap: true,
            show: false,
            estilos: {
                backgroundColor: '#b8daba'
            },
            tipo: 'sin asignar',
            showDetalle: false,
            showAsignar: false,
            pedido_id: '',
            idRepartidor:'',
            isLoading: false,
            fullPage: true,
        }
    },
    components: {
        'detalle-component': Detalle,
        'asignar-component': Asignar,
        Loading
    },
    computed: {
        ...mapGetters('pedidos', ['pedidos']),
        ...mapGetters('repartidores',['datoRepartidor']),
        ...mapGetters('auth',['user'])
    },
    methods: {
        ...mapActions('pedidos', ['getPedidos']),
        ...mapActions('repartidores',['datosRepartidor']),
        filtrarPedidos(tipo)
        {
            switch (tipo) {
                case 'asignados':
                    return this.pedidos.filter(pedido => pedido.entrega !== null);
                    break;
                case 'sin asignar':
                    return this.pedidos.filter(pedido => pedido.entrega === null);
                    break;
                default:
                    return this.pedidos;
                    break;
            }
        },
        openModalDetalle(id){
            this.showDetalle = true;
            this.pedido_id = id;
        },
        openModalAsignar(id){
            this.showAsignar = true;
            this.pedido_id = id;
        },
        closeModalAsignar(){
            this.showAsignar = false;
            this.getPedidos();
        },
        datos(idRepartidor){
            this.datosRepartidor(idRepartidor);
        },
        doAjax() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },2500)
        },
        onCancel() {
            console.log('User cancelled the loader.')
        },
        listen(){
         window.Echo.connector.pusher.config.authEndpoint = `http://localhost:8000/api/broadcasting/auth`;
         window.Echo.private('pedido.'+this.user.restaurante)
         .listen('NuevoPedido', (data) =>{
             this.getPedidos(this.user.restaurante);
             this.sonido();
            //console.log(data);
        });
        },
        sonido(){
            var audio = new Audio('static/assets/sound/notificaction.mp3');
            audio.setAttribute("preload", "auto");
            audio.setAttribute("allow", "autoplay");
            audio.play(); 
        }
    },
    mounted() {
        this.getPedidos(this.user.restaurante)
        this.doAjax()
        this.listen()
    },
}
</script>
<style>
.leaflet-control-attribution{
    display: none;
}
.borde{
    border-left-width: 2px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #f2f3f4 !important;
}

</style>
