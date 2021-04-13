<template>
    <div>
        <breacumbs-component
            titulo="Registrar Restaurante"
            menu="Registrar"
            ruta="/dashboard"
            boton="Volver"
            icono="mdi mdi-arrow-left-bold"
        />
        <div class="row">
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Registrar Restaurante</h4>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        v-model.trim="$v.datos.nombre.$model"
                                        :class="{ 'is-invalid': $v.datos.nombre.$error, 'is-valid': !$v.datos.nombre.$invalid }"
                                        class="form-control"
                                    >
                                    <div v-if="!$v.datos.nombre.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                                <div class="form-group">
                                    <label>Dirección</label>
                                    <textarea
                                        v-model.trim="$v.datos.direccion.$model"
                                        class="form-control"
                                        maxlength="225"
                                        rows="3"
                                        :class="{ 'is-invalid': $v.datos.direccion.$error, 'is-valid': !$v.datos.direccion.$invalid }"
                                    ></textarea>
                                    <div v-if="!$v.datos.direccion.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                                <div class="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        v-model.trim="$v.datos.descripcion.$model"
                                        class="form-control"
                                        maxlength="225"
                                        rows="3"
                                        :class="{ 'is-invalid': $v.datos.descripcion.$error, 'is-valid': !$v.datos.descripcion.$invalid }"
                                    ></textarea>
                                    <div v-if="!$v.datos.descripcion.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                                <div class="row">
                                    <div class="col-xl-6">
                                        <div class="form-group">
                                            <label>Telefono</label>
                                            <input
                                                v-model.trim="$v.datos.telefono.$model"
                                                type="text"
                                                class="form-control"
                                                :class="{ 'is-invalid': $v.datos.telefono.$error, 'is-valid': !$v.datos.telefono.$invalid }"
                                            >
                                            <div v-if="!$v.datos.telefono.required" class="invalid-feedback">El campo es obligatorio</div>
                                            <div v-if="!$v.datos.telefono.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="form-group">
                                            <label>Email</label>
                                            <input
                                                v-model.trim="$v.datos.email.$model"
                                                type="text"
                                                class="form-control"
                                                :class="{ 'is-invalid': $v.datos.email.$error, 'is-valid': !$v.datos.email.$invalid }"
                                            >
                                            <div v-if="!$v.datos.email.required" class="invalid-feedback">El campo es obligatorio</div>
                                            <div v-if="!$v.datos.email.email" class="invalid-feedback">Ingrese un email valido</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>Cargar Logo</label>
                                     <span class="badge badge-warning ml-2" style="font-size: 13px;">Archivos permitidos: .jpg, .png, .bmp</span>
                                    <input
                                        name="logo"
                                        type="file"
                                        class="form-control"
                                        @change="changed"
                                        ref="file"
                                    >
                                    
                                </div>
                                <div class="form-group">
                                    <label>Categorias a la que pertenece </label>
                                    <a-select
                                        mode="multiple"
                                        :size="size"
                                        placeholder="Seleccione una categoria"
                                        :default-value="categorias_default"
                                        @change="handleChange"
                                        style="width: 100%"
                                        >
                                        <a-select-option v-for="categoria in categorias" :key="categoria.id">
                                            {{ categoria.nombre }}
                                        </a-select-option>
                                    </a-select>
                                    <div v-if="!datos.id && categorias_select.length == 0" style="color: #ec4561">El campo es obligatorio</div>
                                    <div v-if="datos.id && categorias_select.length == 0" style="color: #ec4561">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title mb-4">Datos del Administrador</h4>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input
                                        v-model.trim="$v.datos.nameUser.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'is-invalid': $v.datos.nameUser.$error, 'is-valid': !$v.datos.nameUser.$invalid }"
                                    >
                                    <div v-if="!$v.datos.nameUser.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="form-group">
                                    <label>Apellidos</label>
                                    <input
                                        v-model.trim="$v.datos.apellidosUser.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'is-invalid': $v.datos.apellidosUser.$error, 'is-valid': !$v.datos.apellidosUser.$invalid }"
                                    >
                                    <div v-if="!$v.datos.apellidosUser.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="form-group">
                                    <label>Telefono</label>
                                    <input
                                        v-model.trim="$v.datos.telefonoUser.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'is-invalid': $v.datos.telefonoUser.$error, 'is-valid': !$v.datos.telefonoUser.$invalid }"
                                    >
                                    <div v-if="!$v.datos.telefonoUser.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.datos.telefonoUser.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input
                                        v-model.trim="$v.datos.emailUser.$model"
                                        type="text"
                                        class="form-control"
                                        :class="{ 'is-invalid': $v.datos.emailUser.$error, 'is-valid': !$v.datos.emailUser.$invalid }"
                                    >
                                    <div v-if="!$v.datos.emailUser.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.datos.emailUser.email" class="invalid-feedback">Ingrese un email valido</div>
                                </div>
                            </div>
                        </div>
                        
                        <hr>
                        <map-view :ubicacion="datos.ubicacion"></map-view>
                        <div class="row">
                            <button
                                v-if="!datos.id"
                                class="btn btn-success btn-block"
                                @click="guardar()"
                                :disabled="$v.datos.$invalid || categorias_select.length == 0 || !arch"
                            >
                                Registrar
                            </button>
                            <button
                                v-if="datos.id"
                                class="btn btn-success btn-block"
                                @click="modificar()"
                                :disabled="$v.datos.$invalid || categorias_select.length == 0"
                            >
                                Modificar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// [-16.5206657,-68.264163]
import Breacumbs from '../../elements/Breacumbs';
import * as util from '../../../utils/utils';
import MapView from '../restaurantes/map_view';
import { mapGetters, mapActions } from 'vuex';
import { required, email, numeric } from 'vuelidate/lib/validators';
import * as utils from '../../../utils/utils';
export default {
    name: 'RegisterRestaurant',
    data() {
        return {
            size: 'default',
            datos: {
                id: '',
                nombre: '',
                direccion: '',
                telefono: '',
                email: '',
                logo: '',
                descripcion: '',
                ubicacion: {
                    latitude: '',
                    longitude: ''
                },

                categorias: [],
                productos: [],
                nameUser: '',
                apellidosUser: '',
                telefonoUser: '',
                emailUser: '',
            },
            arch: '',
            categorias_default: [],
            categorias_select: [],
        }
    },
    validations: {
        datos: {
            nombre: { required },
            direccion: { required },
            telefono: { required, numeric },
            email: { required, email },
            descripcion: { required },
            nameUser: { required },
            apellidosUser: { required },
            telefonoUser: { required, numeric },
            emailUser: { required, email },
        },
    },
    computed: {
        ...mapGetters('restaurantes', ['restaurante']),
        ...mapGetters('categorias', ['categorias']),

    },
    methods: {
        ...mapActions('categorias', ['getCategorias']),
        ...mapActions('restaurantes', ['storeRestaurante', 'updateRestaurante']),
        handleChange(value) {
            this.categorias_select = value;
            this.datos.categorias = value;
        },
        changed(e){
            this.arch = e.target.files[0];
            //this.datos.logo = e.target.files[0];
            this.datos.logo = this.$refs.file.files[0];
            //console.log(this.arch);
        },
        cargarDatos(){
            if(this.restaurante){
                this.datos.id = this.restaurante.id;
                this.datos.nombre = this.restaurante.nombre;
                this.datos.direccion = this.restaurante.direccion;
                this.datos.telefono = this.restaurante.telefono;
                this.datos.email = this.restaurante.email;
                this.datos.logo = this.restaurante.logo;
                this.datos.descripcion = this.restaurante.descripcion;
                this.datos.ubicacion.latitude = this.restaurante.ubicacion.latitude;
                this.datos.ubicacion.longitude = this.restaurante.ubicacion.longitude;
                this.datos.productos = this.restaurante.productos;
                this.restaurante.categorias.forEach(element => {
                    this.categorias_default.push(element.id);
                    this.categorias_select.push(element.id);
                    this.datos.categorias.push(element.id);
                });
            }else{
                this.datos.id = '';
                this.datos.nombre = '';
                this.datos.direccion = '';
                this.datos.telefono = '';
                this.datos.email = '';
                this.datos.logo = '';
                this.datos.descripcion = '';
                this.datos.ubicacion.latitude = '-16.5206657';
                this.datos.ubicacion.longitude = '-68.2641639';
                this.datos.categorias = [];
                this.datos.productos = [];
                this.categorias_default = [];
                this.categorias_select = [];
            }
        },
        guardar(){
            const formData = new FormData();
            formData.append('nombre', this.datos.nombre);
            formData.append('direccion', this.datos.direccion);
            formData.append('descripcion', this.datos.descripcion);
            formData.append('telefono', this.datos.telefono);
            formData.append('email', this.datos.email);
            formData.append('logo', this.datos.logo);
            formData.append('ubicacion[latitude]', this.datos.ubicacion.latitude);
            formData.append('ubicacion[longitude]', this.datos.ubicacion.longitude);
            formData.append('nameUser', this.datos.nameUser);
            formData.append('apellidosUser', this.datos.apellidosUser);
            formData.append('telefonoUser', this.datos.telefonoUser);
            formData.append('emailUser', this.datos.emailUser)
            for (let index = 0; index < this.datos.categorias.length; index++) {
                formData.append('categorias[]', this.datos.categorias[index]);
            }
            this.storeRestaurante(formData).then( () => {
                utils.alerta("Exito!", `El Restaurante se registro correctamente.`, "success");
                this.$router.push({ path: '/dashboard' });
            }).catch( error => {
                console.log(error);
            });
        },
        modificar(){

            this.updateRestaurante(this.datos).then( () => {
                utils.alerta("Exito!", `Se actualizo los datos correctamente.`, "success");
                this.$router.push({ path: '/' });
            }).catch( error => {
                console.log(error);
            });
        }
    },
    components: {
        'breacumbs-component': Breacumbs,
        MapView,
    },
    mounted() {
        this.cargarDatos();
        this.getCategorias();
    },
}
</script>
