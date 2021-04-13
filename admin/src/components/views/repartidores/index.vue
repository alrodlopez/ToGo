<template>
    <div>
        <breacumbs-component
            titulo="Lista de Repartidoresregistrados"
            menu="Repartidores"
            ruta="dashboard"
            boton="Inicio"
            icono="fas fa-home"
        />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2 col-xs-12">
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-warning btn-block dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                        Buscar por
                                        <i class="mdi mdi-chevron-down"></i>
                                    </button>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#" >Nombre</a>
                                        <a class="dropdown-item" href="#" >Apellidos</a>
                                        <a class="dropdown-item" href="#" >Nit</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-7 col-xs-12">
                                <div class="form-group">
                                    <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                        <input type="text" class="form-control">
                                        <span class="input-group-btn input-group-append">
                                            <button type="button" class="btn btn-secondary">
                                                <i class="fa fa-eraser"></i>Limpiar
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3 col-xs-12">
                                <button type="button" class="btn btn-success btn-block" @click.prevent="onOpenModal('crear', null)">
                                    <i class="fa fa-plus"></i>
                                    Registrar Repartidor
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Repartidores Registrados</h4>
                        <div class="table-responsive">
                            <table class="table table-hover table-centered table-nowrap mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellidos</th>
                                        <th scope="col">Telefono</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Ruat</th>
                                        <th scope="col">Nit</th>
                                        <th scope="col" align="center">Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in repartidores" :key="index">
                                        <th scope="row">{{ index + 1 }}</th>
                                        <td>{{ item.nombre }}</td>
                                        <td>{{ item.apellidos }}</td>
                                        <td>{{ item.telefono }}</td>
                                        <td>{{ item.email }}</td>
                                        <td>{{ item.ruat }}</td>
                                        <td>{{ item.nit }}</td>
                                        <td>
                                            <div>
                                                <button class="btn btn-sm btn-info" @click.prevent="onOpenModal('editar', item)"><i class="fa fa-edit"></i> Editar</button>
                                                <button class="btn btn-sm btn-danger" @click.prevent="eliminar(item.id)"><i class="fa fa-trash"></i> Eliminar</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
    </div>
</template>
<script>
import Breacumbs from '../../elements/Breacumbs';
import crear from './crear';
import editar from './editar'
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'IndesRepartidorPage',
    data() {
        return {
            show: false,
            sw: false,
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
        }
    },
    components: {
        'breacumbs-component': Breacumbs,
        'crear-form': crear,
        'editar-form': editar,
    },
    computed: {
        ...mapGetters('repartidores', ['repartidores']),
    },
    methods: {
        ...mapActions('repartidores', ['getRepartidores', 'deleteRepartidor']),
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
        onCloseModal(){
            this.show = false;
        },
    },
    mounted() {
        this.getRepartidores();
    },
}
</script>
