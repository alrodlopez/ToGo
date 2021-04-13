<template>
    <div>
        <div class="row">
            <div class="col-md-12 col-xs-12 col-lg-6 col-xl-6">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12">
                                <!-- begin widget-list -->
                                <div class="m-b-10 f-s-10 m-t-10">
                                    <a href="#modal-widget-list" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal">Total Pedidos: {{ filtrarPedidos('pendientes').length }}</a>
                                    <b class="text-inverse">LISTA DE PEDIDOS PENDIENTES</b>
                                </div>
                                <div v-if="filtrarPedidos('pendientes').length == 0" class="alert alert-info fade show m-b-10">
                                    <i class="fa fa-info"></i> No tiene <a href="#" class="alert-link">Pedidos Pendientes </a>asignados.
                                </div>
                                <div class="widget-list widget-list-rounded m-b-30" data-id="widget" >
                                    <!-- begin widget-list-item -->
                                    <div v-for="item in filtrarPedidos('pendientes')" :key="item.id" class="widget-list-item m-b-5 borde-pendientes" style="background-color: #f2f3f4;">
                                        <div class="widget-list-content">
                                            <h4 class="widget-list-title">Cliente: {{ item.pedido.cliente.nombre }} {{ item.pedido.cliente.apellidos }}</h4>
                                            <p class="widget-list-desc">Telefono: {{ item.pedido.cliente.telefono }}</p>
                                            <p class="widget-list-desc">Direccion: {{ item.pedido.orden.direccion }}</p>
                                        </div><br>
                                        <div class="pull-right">
                                            <span class="badge badge-danger">PENDIENTE</span>
                                        </div>
                                    </div>
                                    <!-- end widget-list-item -->
                                </div>
                                <!-- end widget-list -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             <div class="col-md-12 col-xs-12 col-lg-6 col-xl-6">
                 <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-xl-12 col-lg-12">
                                <!-- begin widget-list -->
                                <div class="m-b-10 f-s-10 m-t-10">
                                    <a href="#modal-widget-list" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal">Total pedidos: {{ filtrarPedidos('entregados').length }}</a>
                                    <b class="text-inverse">LISTA DE PEDIDOS ENTRGADOS</b>
                                </div>
                                <div v-if="filtrarPedidos('entregados').length == 0" class="alert alert-info fade show m-b-10">
                                    <i class="fa fa-info"></i> No tiene <a href="#" class="alert-link">Pedidos Entregados </a>asignados.
                                </div>
                                <div class="widget-list widget-list-rounded m-b-30" data-id="widget" >
                                    <!-- begin widget-list-item -->
                                    <div v-for="item in filtrarPedidos('entregados')" :key="item.id" class="widget-list-item m-b-5 borde-entregados" style="background-color: #f2f3f4;">
                                        <div class="widget-list-content">
                                            <h4 class="widget-list-title">Cliente: {{ item.pedido.cliente.nombre }} {{ item.pedido.cliente.apellidos }}</h4>
                                            <p class="widget-list-desc">Telefono: {{ item.pedido.cliente.telefono }}</p>
                                            <p class="widget-list-desc">Direccion: {{ item.pedido.orden.direccion }}</p>
                                        </div><br>
                                        <div class="pull-right">
                                            <span class="badge badge-green">ENTREGADO</span>
                                        </div>
                                    </div>
                                    <!-- end widget-list-item -->
                                </div>
                                <!-- end widget-list -->
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name: 'EntregasRepartidor',
    props: {
        idRepartidor: {
            type: Number,
            required: true
        }
    },
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('repartidores', ['entregas'])
    },
    methods: {
        ...mapActions('repartidores', ['entregasRepartidor']),
        filtrarPedidos(tipo){
            if(tipo == 'entregados')
                return this.entregas.entregas.filter(entrega => entrega.estado_entrega === 'ENTREGADO');
            if(tipo == 'pendientes')
                return this.entregas.entregas.filter(entrega => entrega.estado_entrega === 'PENDIENTE');
        },
    },
    mounted() {
        this.entregasRepartidor(this.idRepartidor);
    },
}
</script>
<style scoped>
.borde-entregados {
    border-left-width: 3px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #32a932 !important;
}
.borde-pendientes {
    border-left-width: 3px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #ff5b57 !important;
}
</style>
