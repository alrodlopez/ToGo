<template>
    <div>
        <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Escritorio</a></li>
            <li class="breadcrumb-item active">Repartidores</li>
        </ol>
        <h1 class="page-header">Repartidores<small> lista de repartidores registrados en el sistema</small></h1>
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
                                        <a href="#" @click="estado = ''" class="dropdown-item">Todos</a>
                                        <a href="#" @click="estado = 'Libre'" class="dropdown-item">Libres</a>
                                        <a href="#" @click="estado = 'En ruta'" class="dropdown-item">En ruta</a>
                                    </div>
                                </div>
                                <input type="text" class="form-control input-white" placeholder="Ingrese palabras clave aquí...">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-default mr-1"><i class="fa fa-search fa-fw"></i> Buscar</button>
                                    <button type="button" class="btn btn-primary no-caret" @click.prevent="onOpenModal('crear', null)">
                                        <i class="fa fa-plus"> Nuevo</i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row vld-parent">

            <loading :active.sync="isLoading"
            :can-cancel="false"
            :on-cancel="onCancel"
            :is-full-page="false"></loading>

            <div
                class="col-xl-4 col-lg-6 m-b-5 p-b-1"
                v-for="repartidor in filtarPorEstado(estado)"
                :key="repartidor.id"
            >
                <div class="p-10 bg-white circle borde">
                    <div class="row">
                        <div class="media media-xs overflow-visible pr-2 pl-2">

                            <a class="media-left" href="#">
                                <img src="static/assets/img/user/repartidor.jpg" alt="" class="media-object img-circle">
                            </a>
                            <div class="media-body media-left">
                                <b class="text-inverse"><h5>{{ repartidor.nombre }} {{ repartidor.apellidos }}</h5></b><br>
                            </div>
                            <div class="media-body valign-middle text-right overflow-visible">
                                <div class="btn-group btn-group-sm dropdown">
                                    <a href="#" v-bind:class="{'btn btn-lime': repartidor.estado == 'Libre', 'btn btn-danger': repartidor.estado == 'En ruta'}"><i v-bind:class="{'fa fa-check-circle': repartidor.estado == 'Libre', 'fa fa-times-circle': repartidor.estado == 'En ruta'}"></i> {{ repartidor.estado }}</a>
                                    <a href="#" data-toggle="dropdown" class="btn btn-default dropdown-toggle"><b class="caret"></b></a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a href="#" class="dropdown-item" @click.prevent="onOpenModalEntregas(repartidor.id)"><i class="fa fa-motorcycle"></i> Ver entregras</a>
                                        <!-- <div class="dropdown-divider"></div> -->
                                        <!-- <a href="#" class="dropdown-item"><i class="fa fa-lock"></i> Cambiar contrasenia</a>
                                        <a href="#" class="dropdown-item" @click.prevent="onOpenModal('editar', repartidor)"><i class="fa fa-edit"></i> Editar</a>
                                        <a href="#" class="dropdown-item" @click.prevent="eliminar(repartidor.id)"><i class="fa fa-trash"></i> Eliminar</a> -->
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="row pl-2">
                        <div class="media-body media-left">
                            <span><b class="text-inverse">Telefono:</b> {{ repartidor.telefono }}</span><br>
                            <span><b class="text-inverse">Email:</b> {{ repartidor.email }}</span><br>
                            <span v-if="repartidor.nit"><b class="text-inverse">Nit:</b> {{ repartidor.nit }}</span>
                            <span v-if="!repartidor.nit"><b class="text-inverse">Nit:</b><span class="badge badge-warning">sin dato</span></span><br>
                            <span v-if="repartidor.ruat"><b class="text-inverse">Ruat:</b> {{ repartidor.ruat }}</span>
                            <span v-if="!repartidor.ruat"><b class="text-inverse">Ruat:</b><span class="badge badge-warning">sin dato</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal
            :width="600"
            :visible="show"
            :destroyOnClose="true"
            :maskClosable="false"
            :centered="false"
            @cancel="show=false"
            :header="null"
            :footer="null"
        >
            <div class="body">
                <crear-form v-if="!sw" @close_modal="onCloseModal"></crear-form>
                <editar-form v-if="sw" :repartidor="repartidor" @close_modal="onCloseModal"></editar-form>
            </div>
        </a-modal>
        <a-modal
            :width="1000"
            title="Pedidos Asignados"
            :visible="showEntregas"
            :destroyOnClose="true"
            :maskClosable="false"
            :centered="false"
            cancelText="Cancelar"
            @cancel="showEntregas=false"
            @ok="showEntregas=false"
        >

            <entregas-repartidor :idRepartidor="idRepartidor"></entregas-repartidor>

        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import crear from './crear'
import editar from './editar'
import entregas from './entregas'
import axios from '../../../config/axios/axios'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
    name: "IndexRepartidores",
    data(){
        return {
            estado: '',
            show: false,
            sw: false,
            showEntregas: false,
            repartidor: {
                id: '',
                nombre: '',
                apellidos: '',
                email: '',
                telefono: '',
                nit: '',
                ruat: '',
                user_id: '',
            },
            idRepartidor: '',
            isLoading: false,
            fullPage: true,
        }
    },
    components: {
        'crear-form': crear,
        'editar-form': editar,
        'entregas-repartidor': entregas,
        Loading

    },
    computed: {
        ...mapGetters('repartidores', ['repartidores'])
    },
    methods: {
        ...mapActions('repartidores', ['getRepartidores', 'deleteRepartidor', 'entregasRepartidor']),
        eliminar(id){
            this.$swal.fire({
                title: 'Estas seguro?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#00acac',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!',
                cancelButtonText: 'No, Cancelar',
            }).then((result) => {
                if (result.value) {
                    this.deleteRepartidor(id).then( response => {
                        this.$swal.fire('Eliminado!', 'El registro fue eliminado.', 'success');
                    }).catch( error => {
                        this.$swal.fire('Ops!', 'Algo salio mal.', 'error');
                    })
                }
            })
        },
        filtarPorEstado(estado){
            if(estado !== '')
                return this.repartidores.filter(repartidor => repartidor.estado === estado);
            else
                return this.repartidores;
        },
        onOpenModal(tipo, datos){
            if(tipo == 'crear') {
                this.show = true;
                this.sw = false;
            }
            if(tipo == 'editar') {
                this.show = true;
                this.repartidor.id = datos.id;
                this.repartidor.nombre = datos.nombre;
                this.repartidor.email = datos.email;
                this.repartidor.apellidos = datos.apellidos;
                this.repartidor.telefono = datos.telefono;
                this.repartidor.nit = datos.nit;
                this.repartidor.ruat = datos.ruat;
                this.repartidor.user_id = datos.user_id;
                this.sw = true;
            }

        },
        onOpenModalEntregas(id){
            this.showEntregas = true;
            this.idRepartidor = id;
        },
        onCloseModal(){
            this.show = false;
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
        }
    },
    mounted() {
        this.getRepartidores();
        this.entregasRepartidor(1);
        this.doAjax();
    },
};
</script>
<style scoped>
.body {
    padding: -20px -20px -10px;
}
.borde {
    border-left-width: 3px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #ffd900 !important;
}
</style>
