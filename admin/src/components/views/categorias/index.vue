<template>
    <div>
        <breacumbs-component
            titulo="Lista de Categorias registrados"
            menu="Categorias"
            ruta="dashboard"
            boton="Inicio"
            icono="fas fa-home"
        />
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12 col-lg-12">
                                <div class="checkbox checkbox-css">
                                    <input type="checkbox" id="cssCheckbox1"  v-model="check">
                                    <label for="cssCheckbox1">Quiero usar mi propia clasificacion</label>
                                </div>
                            </div>
                        </div>
                        <div class="row" v-if="check">
                            <div class="col-md-12 col-xl-12 col-lg-12">
                                <div class="form-group">
                                    <div class="input-group bootstrap-touchspin bootstrap-touchspin-injected">
        
                                        <input type="text" v-model="categoria.nombre" placeholder="Ingrese el nombre de la nueva categoria" class="form-control">
                                        <span class="form-control">
                                        <input
                                            id="logos"
                                            name="logo"
                                            type="file"
                                            @change="onFileChange"
                                            ref="file"  
                                        />
                                        </span>
                                        <span class="input-group-btn input-group-append">
                                            <button class="btn btn-primary" type="button" @click="guardar()" :disabled="!categoria.nombre || !categoria.logo"><i class="fa fa-plus"></i> Agregar Categoria</button>
                                        </span>
                                    </div>
                                    <small class="f-s-12 text-grey-darker">Ejemplos: Comida China, Pasteleria..</small>
                                </div>
                            </div>
                            <div class="col-md-12 col-xl-6 col-lg-6">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <loading
                    :active.sync="isLoading"
                    :can-cancel="false"
                    :is-full-page="true"
                >
                </loading>
                <list-categories :check="check"></list-categories>
            </div>
        </div>
    </div>
</template>
<script>
import Breacumbs from '../../elements/Breacumbs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import ListCategories from './list_categories';
import { required, email, numeric } from 'vuelidate/lib/validators';
import { mapGetters, mapActions } from 'vuex';
import * as utils from '../../../utils/utils'
export default {
    name: 'CategoriasIndexPage',
    data() {
        return {
            categoria: {
                nombre: '',
                logo: ''
            },
            check: true,
            isLoading: false,
        }
    },
    
    components: {
        'breacumbs-component': Breacumbs,
        ListCategories,
        Loading
    },
    methods: {

        ...mapActions('categorias', ['storeCategoria']),
        guardar(){
            const formData = new FormData();
            formData.append('nombre',this.categoria.nombre);
            formData.append('logo',this.categoria.logo);
            this.storeCategoria(formData).then( () => {
                utils.alerta("Exito!", "La Categoria se registro correctamente.", "success");
                this.categoria.nombre = '';
                this.categoria.logo = '';
                document.getElementById("logos").value=null; 
            }).catch( error => {
                console.log(error);
            })
        },
        loading() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },5000)
        },
        onFileChange(e) {
            this.categoria.logo = this.$refs.file.files[0]
            //console.log(this.categoria.logo)
        },
    },
    mounted() {
        //this.loading();
    },
}
</script>
