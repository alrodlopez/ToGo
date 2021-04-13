<template>
    <div class="card">
        <div class="card-body">
            <div class="widget-list">
                <div
                    v-for="(item, index) in categorias" :key="index"
                    class="widget-list-item mb-2 borde"
                    style="background-color: rgb(242, 243, 244);"
                >
                    <div class="widget-list-content">
                        <h4 class="widget-list-title">{{ item.nombre }}</h4>
                        <p class="widget-list-desc">creado: {{ item.created_at }}</p>
                    </div>
                    <p></p>
                    <div class="text-right">
                        <button href="#" class="btn btn-primary btn-sm" @click="abrirModal(item)" v-if="check"><i class="fa fa-edit"></i> Editar</button>
                        <button class="btn btn-danger btn-sm" @click="confirmar(item)" v-if="check"><i class="fa fa-trash"></i> Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal" id="editar">
            <div class="modal-dialog" >
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title mt-0">Editar Categoria</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>Categoria</label>
                            <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
                                <input
                                    type="text"
                                    v-model.trim="$v.nombre.$model"
                                    :class="{ 'is-invalid': $v.nombre.$error, 'is-valid': !$v.nombre.$invalid }"
                                    placeholder="Ingrese el nombre de la nueva categoria"
                                    class="form-control"
                                >
                                <div v-if="!$v.nombre.required" class="invalid-feedback">El campo es obligatorio</div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" @click="editar()"><i class="fa fa-check"></i> Guardar</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import * as utils from '../../../utils/utils';
import { required } from 'vuelidate/lib/validators';
export default {
    name: 'ListCategoriasPage',
    props: {
        check: {
            type: Boolean,
            required: true,
            default: true
        }
    },
    data () {
        return {
            nombre: '',
            id: ''
        }
    },
    validations: {
        nombre: { required },
    },
    computed: {
        ...mapGetters('categorias', ['categorias'])
    },
    methods: {
        ...mapActions('categorias', ['getCategorias', 'deleteCategoria', 'updateCategoria']),
        confirmar(categoria){
            this.$swal.fire({
                title: 'Esta seguro?',
                text: "Esta seguro de eliminar la categoria: " + categoria.nombre,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.value) {
                    this.eliminar(categoria);
                }
            });

        },
        eliminar(categoria){
            this.deleteCategoria(categoria.id).then( () => {
                utils.alerta("Eliminado!", `La Categoriase ${categoria.nombre} se elimino correctamente.`, "success");
            }).catch( error => {
                console.log(error);
            })
        },
        abrirModal(categoria){
            this.nombre = categoria.nombre;
            this.id = categoria.id;
            $('#editar').modal({backdrop: 'static', keyboard: false, show: true});
        },

        editar(){
            let data = {
                id: this.id,
                nombre: this.nombre
            };
            this.updateCategoria(data).then( () => {
                $('#editar').modal('hide');
                utils.alerta("Actualizado!", `La Categoria se actualizo correctamente.`, "success");
            }).catch( error => {
                console.log(error);
            })
        }
    },
    mounted() {
        this.getCategorias();
    },
}
</script>
<style>
.widget-list .widget-list-item {
    display: table;
    width: 100%;
    background: #fff;
    text-decoration: none;
    color: #2d353c;
}
.widget-list .widget-list-item .widget-list-content {
    padding: 10px;
    display: table-cell;
    vertical-align: middle;
}
.widget-list .widget-list-item .widget-list-title {
    font-size: 16px;
    line-height: 16px;
    margin: 0;
}
.widget-list .widget-list-item .widget-list-desc {
    font-size: 11px;
    margin: 0;
    color: #6f8293;
}
.widget-list .widget-list-item>div:last-child {
    padding-right: 15px;
}
.widget-list .widget-list-item .widget-list-action {
    padding: 10px;
    display: table-cell;
    vertical-align: middle;
    width: 10%;
    padding-left: 15px;
    text-align: center;
}
.borde {
    border-left-width: 3px!important;
    border-left-style: solid!important;
    border-left-color: transparent;
    border-color: #02a499 !important;
}
</style>
