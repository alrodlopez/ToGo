<template>
    <div>
        <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Escritorio</a></li>
            <li class="breadcrumb-item active">Productos</li>
        </ol>
        <h1 class="page-header">Productos<small> lista de productos registrados en el sistema</small></h1>
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
                                        <a href="#" @click="categoria = ''" class="dropdown-item">Todos</a>
                                        <a href="#" class="dropdown-item" @click="categoria = tipo.nombre"
                                                                   v-for="tipo in tipos" :key="tipo.id"
                                        >{{tipo.nombre}}</a>
                                    </div>
                                </div>
                                <input type="text" class="form-control input-white" placeholder="Ingrese palabras clave aquí...">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-default mr-1"><i class="fa fa-search fa-fw"></i> Buscar</button>

                                    <a href="#" @click.prevent="abrirModalNuevo()" type="button" class="btn btn-primary no-caret">
                                        <i class="fa fa-plus"> Nuevo</i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row" >

            <div class="col-xl-12 col-lg-12 col-xs-12 col-sm-12 vld-parent">
                <loading :active.sync="isLoading"
                :can-cancel="false"
                :on-cancel="onCancel"
                :is-full-page="false"></loading>
                <div v-if="filtradoCategoria(categoria).length == 0" class="alert alert-info fade show m-b-10">
                    <i class="fa fa-info"></i> No existen <a href="#" class="alert-link">Productos </a>para la categoria seleccionada.
                </div>
            </div>

        </div>
        <div class="gallery row">

            <div v-for="producto in filtradoCategoria(categoria)" :key="producto.id"
                class="image gallery-group-3 col-xl-4 col-lg-4 col-md-6 col-xs-12 col-sm-12"
            >
                <div class="image-inner">
                    <div
                        class="img"
                        v-bind:style="{ backgroundImage: `url(${producto.imagen})` }"
                        alt
                    >
                        <p class="image-caption">{{producto.tipo.nombre}}</p>
                    </div>
                    <div class="image-info">
                        <h5 class="title">{{ producto.nombre }}</h5>
                        <div class="pull-right">
                            <h3 class="text-warning">{{ producto.precio }} Bs.</h3>
                        </div>
                        <div class="rating">
                            <span>Precio</span>
                        </div>
                        <div class="desc">
                            {{ producto.descripcion}}
                        </div>
                        Variedad: 
                        <span v-for="(detalles,index) in filtroProductos(producto.producto_id)" :key="index">
                             {{detalles.nombre}} -
                        </span>
                        <br />
                        <div class="row" v-if="rol != 'Empleado' && rol!= 'Usuario'">
                            <div class="col col-12">
                                <button @click.prevent="abrirModalVariedad(producto.producto_id)" class="btn btn-sm btn-secondary"><i class="fas fa-list"></i> Variedad</button>
                                <a href="#" class="btn btn-sm btn-danger" @click.prevent="eliminar(producto.producto_id)"><i class="fas fa-trash-alt"></i>Eliminar</a>
                                <button @click.prevent="abrirModalEditar(producto)" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i>Editar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="modal fade" id="editar">
            <div class="modal-dialog">
                <div class="modal-content vld-parent">
                    <loading :active.sync="isLoading"
                        :can-cancel="false" 
                        :on-cancel="onCancel"
                        :is-full-page="false"></loading>
                    <div class="modal-header">
                        <h4 class="modal-title">Modificar Producto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Nombre:</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.nombre.$model"
                                        :class="{ 'is-invalid': $v.form.nombre.$error, 'is-valid': !$v.form.nombre.$invalid }"
                                    />
                                    <div v-if="!$v.form.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Descripcion:</label>
                                    <textarea
                                        class="form-control"
                                            v-model.trim="$v.form.descripcion.$model"
                                        type="text"
                                        :class="{ 'is-invalid': $v.form.descripcion.$error, 'is-valid': !$v.form.descripcion.$invalid }"
                                        rows="3"
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Precio :</label>
                                    <input
                                        class="form-control"
                                        v-model.trim="$v.form.precio.$model"
                                        type="text"
                                        :class="{ 'is-invalid': $v.form.precio.$error, 'is-valid': !$v.form.precio.$invalid }"
                                    />
                                    <div v-if="!$v.form.precio.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.precio.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Tipo :</label>
                                    <select class="form-control" v-model.trim="$v.form.tipo_id.$model" :class="{ 'is-invalid': $v.form.tipo_id.$error, 'is-valid': !$v.form.tipo_id.$invalid }">
                                        <option :value="tipo.tipo_id"
                                            v-for="tipo in tipos"
                                            :key="tipo.tipo_id"> {{tipo.nombre}}
                                        </option>
                                    </select>
                                    <div v-if="!$v.form.tipo_id.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                       <a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                       <button type="button" class="btn btn-success" :disabled="$v.form.$invalid" @click="editar()"><i class="fa fa-check"></i> Actualizar</button>
                       <!--<button type="button" class="btn btn-success" @click="editar()" :disabled="$v.$invalid"><i class="fa fa-check"></i> Actualizar</button>-->
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="variedad">
            <div class="modal-dialog">
                <div class="modal-content vld-parent">
                    <loading :active.sync="isLoading"
                        :can-cancel="false" 
                        :on-cancel="onCancel"
                        :is-full-page="false"></loading>
                    <div class="modal-header">
                        <h4 class="modal-title">Variedad del Producto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="form-group">
                                   
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.detalle.nombre.$model"
                                        placeholder="Nombre..."
                                        :class="{ 'is-invalid': $v.detalle.nombre.$error, 'is-valid': !$v.detalle.nombre.$invalid }"
                                    />
                                    <div v-if="!$v.detalle.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="form-group">
                                    <button v-if="this.boton == 'crear'" type="button" class="btn btn-primary form-control" @click="crearDetalle()" :disabled="$v.detalle.$invalid"><i class="fa fa-plus"></i> Agregar</button>
                                    <button v-if="this.boton == 'editar'" type="button" class="btn btn-secondary  form-control" @click="actualizarDetalle()" :disabled="$v.$invalid.detalle"><i class="fa fa-edit"></i> Actualizar</button>
                                </div>
                            </div>
                            
                        </div>
                        
                        <div class="row">
                            <ul  class="col-sm-12 list-group" >
                                <li v-for="(variedad, index) in filtroProductos(id)" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
                                    {{variedad.nombre}}
                                    <div>
                                   <a href="#" @click.prevent="editarDetalle(variedad)"> <span class="badge badge-primary badge-pill"><i class="fas fa-edit"></i></span> </a>
                                   <a href="#" @click.prevent="eliminarDetalle(variedad.detalle_id)"> <span class="badge badge-danger badge-pill"><i class="fas fa-trash"></i></span> </a>
                                   </div>
                                </li>
                            </ul>
                            
                        </div>
                    </div>
                    <div class="modal-footer">
                       <a href="#" class="btn btn-white" data-dismiss="modal" @click="limpiar"><i class="fa fa-ban"></i> Cancelar</a>
                       <!--<button type="button" class="btn btn-success" @click="editar()" :disabled="$v.$invalid"><i class="fa fa-check"></i> Actualizar</button>-->
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="nuevo">
            
            <div class="modal-dialog ">
                
                <div class="modal-content vld-parent">
                    <loading :active.sync="isLoading"
                        :can-cancel="false" 
                        :on-cancel="onCancel"
                        :is-full-page="false"></loading>
                    <div class="modal-header">
                        <h4 class="modal-title">Crear Producto</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Nombre</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.nombre.$model"
                                        :class="{ 'is-invalid': $v.form.nombre.$error, 'is-valid': !$v.form.nombre.$invalid }"
                                        placeholder="Nombre"
                                    />
                                    <div v-if="!$v.form.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Precio</label><br>
                                    <small class="text-warning">El campo solo utiliza (.) decimal</small>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.precio.$model"
                                        :class="{ 'is-invalid': $v.form.precio.$error, 'is-valid': !$v.form.precio.$invalid }"
                                        placeholder="Precio"
                                    />
                                    <div v-if="!$v.form.precio.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.precio.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                    <div v-if="!$v.form.precio.minValue" class="invalid-feedback">El campo solo pormite valores positivos</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Descripcion</label>
                                    <textarea
                                        class="form-control"
                                        v-model.trim="$v.form.descripcion.$model"
                                        placeholder="Ingrese la descripción"
                                        :class="{ 'is-invalid': $v.form.descripcion.$error, 'is-valid': !$v.form.descripcion.$invalid }"
                                        rows="3"
                                    ></textarea>
                                    <div v-if="!$v.form.descripcion.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Categorias</label><br>
                                    <div>
                                        <select class="form-control" data-parsley-required="true"
                                        v-model.trim="$v.form.tipo_id.$model"
                                        >
                                            <option disabled value="">Seleccione un elemento</option>
                                            <option :value="tipo.tipo_id"
                                                v-for="tipo in tipos" :key="tipo.tipo_id">{{tipo.nombre}}
                                            </option>
                                        </select>
                                        <div v-if="!$v.form.tipo_id.required" class="invalid-feedback">El campo es obligatorio</div>
                                        </div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Subir Imagen</label>
                                    <span class="fileinput-button">
                                        <input
                                            name="imagen"
                                            type="file"
                                            @change="onFileChange"
                                            ref="file"
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        <button type="button" class="btn btn-yellow no-caret" v-on:click="agregar()" :disabled="$v.form.$invalid"><i class="fa fa-plus"></i> Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { required, numeric, minValue, decimal } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import * as utils from '../../../utils/utils'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'IndexView',
    data(){
        return {
            categoria:'',
            dato:'',
            isLoading: false,
            fullPage: true,
            rol: '',
            form: {
                id:'',
                nombre:'',
                descripcion:'',
                precio:'',
                imagen:'',
                tipo_id:'',
                restaurante_id:''
            },
            detalle: {
                id: '',
                nombre: '',
                producto_id: ''
            },
            id: '',
            boton: 'crear',
        }
    },
    components: {
		Loading
	},
    validations:{
        form:{
            nombre:{ required },
            imagen:{ required },
            descripcion:{ required },
            precio:{ required, decimal },
            tipo_id:{ required }
        },
        detalle: { nombre: { required }}
    },
    computed:{
        //a los gettera la funcion
        ...mapGetters('productos',['productos']),
        ...mapGetters('tipos',['tipos']),
        ...mapGetters('auth', ['user']),
        ...mapGetters('detalles',['detalles']),
    },
    methods:{
        // llamar a la accion
        ...mapActions('productos',['getProductos','addProducto','editProducto','deleteProducto']),
        ...mapActions('tipos',['getTipos']),
        ...mapActions('detalles',['getDetalles', 'addDetalle', 'editDetalle', 'deleteDetalle']),
        agregar(){
            this.doAjax();
            const formData = new FormData();
            formData.append('nombre',this.form.nombre);
            formData.append('imagen',this.form.imagen);
            formData.append('descripcion',this.form.descripcion);
            formData.append('precio',this.form.precio);
            formData.append('tipo_id',this.form.tipo_id);
            formData.append('restaurante_id',this.user.restaurante);
            this.addProducto(formData).then( () => {
                $('#nuevo').modal('hide');
                this.$swal.fire('Exito!','Registro creado exitosamente.','success');
            }).catch(error =>{
                this.$swal.fire('Ops!',utils.showErrors(error.response.data.errors),'error');
            })
        },
        editar(){
            this.doAjax();
            this.editProducto(this.form).then(response => {
                $('#editar').modal('hide');
                this.form.nombre='';
                this.form.imagen='';
                this.form.descripcion='';
                this.form.precio='';
                this.form.tipo_id='';
                this.form.restaurante_id='';
                this.$swal.fire('Exito!','Registro actualizado exitosamente.','success');
            }).catch(error =>{
                this.$swal.fire('Ops!',utils.showErrors(error.response.data.errors),'error');
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
                    this.deleteProducto(id).then( response => {
                        this.$swal.fire('Eliminado!', 'El registro fue eliminado.', 'success');
                    }).catch( error => {
                        this.$swal.fire('Ops!', 'Algo salio mal.', 'error');
                    })
                }
            })
        },
         abrirModalEditar(form){
            this.form.id = form.producto_id;
            this.form.nombre= form.nombre;
            this.form.imagen= form.imagen;
            this.form.descripcion= form.descripcion;
            this.form.precio= form.precio;
            this.form.tipo_id= form.tipo.id;
            this.form.restaurante_id= this.user.restaurante;
            this.$v.form.$reset();
            $('#editar').modal({backdrop: 'static', keyboard: false, show: true});
        },
        abrirModalNuevo(){
            this.form.nombre='';
            this.form.imagen='';
            this.form.descripcion='';
            this.form.precio='';
            this.form.tipo_id='';
            this.form.restaurante_id='';
            this.$v.form.$reset();
            $('#nuevo').modal({backdrop: 'static', keyboard: false, show: true});
        },
        abrirModalVariedad(id){
            this.id = id;
            this.detalle.producto_id = id;
            $('#variedad').modal({backdrop: 'static', keyboard: false, show: true});
        },
        editarDetalle(detalle){
            this.detalle.id = detalle.detalle_id,
            this.detalle.nombre = detalle.nombre,
            this.boton = 'editar'
        },
        crearDetalle(){
            this.doAjax();
            this.addDetalle(this.detalle).then( () => {
                this.$swal.fire('Exito!', 'Registro creado exitosamente.', 'success');
                this.detalle.nombre = '';
                this.$v.detalle.$reset();
                this.$emit('close_modal', null)
            }).catch( error => {
                console.log(error)
            })
        },
        actualizarDetalle(){
            this.doAjax();
            this.editDetalle(this.detalle).then( response => {
                this.$swal.fire('Exito!', 'Registro actualizado exitosamente.', 'success');
                this.detalle.nombre = '';
                this.$v.detalle.$reset();
                this.boton = 'crear';
                this.$emit('close_modal', null)
                //console.log(response)
            }).catch( error => {
                console.log(error)
            })
        },
        filtroProductos(id){
            return this.detalles.filter(item => item.producto_id === id)
        },
        eliminarDetalle(id){
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
                    this.deleteDetalle(id).then( response => {
                        this.$swal.fire('Eliminado!', 'El registro fue eliminado.', 'success');
                    }).catch( error => {
                        this.$swal.fire('Ops!', 'Algo salio mal.', 'error');
                    })
                }
            })
        },
        limpiar(){
            this.detalle.id = '';
            this.detalle.nombre = '';
            this.detalle.producto_id = '';
            this.id = '';
            this.boton = 'crear';
            this.$v.detalle.$reset();
        },
        onFileChange(e) {
            this.form.imagen = this.$refs.file.files[0]
        },
        filtradoCategoria(categoria){
            if(categoria!=='')
               return this.productos.filter(form => form.tipo.nombre === categoria);
            else
                return this.productos
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
        rolex() {
            this.rol = this.user.rol[0].nombre
        },
       

    },
    mounted(){
        this.getProductos(this.user.restaurante),
        this.getTipos(),
        this.getDetalles(),
        this.doAjax()
        this.rolex()
    }
};
</script>
<style>
    .centrar{
        text-align: center;
    }
</style>
