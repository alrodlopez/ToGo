<template>
    <div>

        <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Escritorio</a></li>
            <li class="breadcrumb-item active">Clasificacion</li>
        </ol>

        <h1 class="page-header">Clasificacion de Productos <small>clasifique los productos registrados en el sistema</small></h1>

        <div class="panel">
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-12 col-lg-12">
                        <div class="checkbox checkbox-css">
                            <input type="checkbox" id="cssCheckbox1" value="" checked="" v-model="check">
                            <label for="cssCheckbox1">Quiero usar mi propia clasificacion</label><br><br>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="check">
                    <div class="col-md-12 col-xl-6 col-lg-6">
                        <div class="input-group">
                            <input type="text" v-model="tipo.nombre" class="form-control" placeholder="Nombre">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-yellow no-caret" @click="agregar()" :disabled="$v.$invalid"><i class="fa fa-plus"></i> Agregar clasificacion</button>
                            </div>

                        </div>
                        <small class="f-s-12 text-grey-darker">Ejemplos: Bebidas, Helados..</small>
                    </div>

                    <div class="col-md-12 col-xl-6 col-lg-6"></div>
                </div><br>
            </div>
        </div>
        <div class="panel">
            <div class="panel-body">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <!-- begin widget-list -->
                        <div class="m-b-10 f-s-10 m-t-10">
                            <a href="#modal-widget-list" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal">opciones</a>
                            <b class="text-inverse">LISTA DE CLASIFICACIONES REGISTRADAS</b>
                        </div>
                        <div class="widget-list widget-list-rounded m-b-30" data-id="widget" >
                            <!-- begin widget-list-item -->
                            <div v-for="tipo in tipos" :key="tipo.tipo_id" class="widget-list-item m-b-5 borde" style="background-color: #f2f3f4;">
                                <div class="widget-list-content">
                                    <h4 class="widget-list-title">{{ tipo.nombre }}</h4>
                                    <p class="widget-list-desc">creado: {{ tipo.created_at }}</p>
                                </div><br>
                                <div class="pull-right" v-if="check">
                                    <a href="#" class="btn btn-primary btn-xs" @click.prevent="abrirModal(tipo)"><i class="fa fa-edit"></i> Editar</a>
                                    <a href="#" class="btn btn-danger btn-xs" @click.prevent="eliminar(tipo.tipo_id)"><i class="fa fa-trash"></i> Eliminar</a>
                                </div>
                            </div>
                            <!-- end widget-list-item -->
                        </div>
                        <!-- end widget-list -->
                    </div>
                </div>
            </div>
        </div>
        <a-modal
            title="Editar Clasificacion"
            :visible="show"
            @cancel="closeModal"
            @ok="editar()"
            :destroyOnClose="false"
            :maskClosable="false"
            cancelText="Cancelar"
            okText="Actualizar"
            :centered="true"
        >
            <editForm :modelo="tipo"></editForm>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import * as utils from '../../../utils/utils'
import editForm from './edit'
export default {
    name: 'IndexView',
    data() {
        return {
            tipo: {
                id: '',
                nombre: ''
            },
            show: false,
            check: true,
        }
    },
    validations: {
        tipo: {
            nombre: { required },
        }
    },
    components: {
        editForm
    },
    computed: {
        ...mapGetters('tipos', ['tipos']),
    },
    methods: {
        ...mapActions('tipos', ['getTipos', 'addTipo', 'editTipo', 'deleteTipo']),
        agregar(){
            this.addTipo(this.tipo).then( () => {
                this.tipo.nombre = '';
                this.$swal.fire('Exito!', 'Registro creado exitosamente.', 'success');
            }).catch( error => {
                this.tipo.nombre = '';
                this.$swal.fire('Ops!', utils.showErrors(error.response.data.errors), 'error');
            })
        },
        editar(){
            this.editTipo(this.tipo).then( response => {
                this.closeModal();
                this.tipo.nombre = '';
                this.$swal.fire('Exito!', 'Registro actualizado exitosamente.', 'success');
            }).catch( error => {
                console.log(error);
                this.$swal.fire('Ops!', utils.showErrors(error.response.data.errors), 'error');
            })
        },
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
                    this.deleteTipo(id).then( response => {
                        this.$swal.fire('Eliminado!', 'El registro fue eliminado.', 'success');
                    }).catch( error => {
                        this.$swal.fire('Ops!', 'Algo salio mal.', 'error');
                    })
                }
            })

        },
        abrirModal(tipo){
            this.show = true;
            this.tipo.id = tipo.tipo_id
            this.tipo.nombre = tipo.nombre;
        },
        closeModal(){
            this.show = false;
        }
    },
    mounted() {
        this.getTipos()
    },
}
</script>
<style scoped>
.borde {
    border-left-width: 3px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #ffd900 !important;
}
</style>
