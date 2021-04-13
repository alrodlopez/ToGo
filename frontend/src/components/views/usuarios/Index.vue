<template>
    <div>
       <ol class="breadcrumb float-xl-right">
            <li class="breadcrumb-item"><a href="javascript:;">Escritorio</a></li>
            <li class="breadcrumb-item active">Usuarios</li>
        </ol>

        <h1 class="page-header">Usuarios<small> lista de usuarios registrados en el sistema</small></h1>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-xl-12">
                <div class="panel">
                    <div class="panel-body">
                        <div class="row">
                            <div class="input-group mb-1 mr-2">
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
		<div class="panel panel-inverse" data-sortable-id="table-basic-7">
			<!-- begin panel-heading -->
			<div class="panel-heading">
				<h4 class="panel-title">Usuarios</h4>
				<div class="panel-heading-btn">
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
				</div>
			</div>
			<!-- end panel-heading -->
			<!-- begin panel-body -->
			<div class="panel-body">
				<!-- begin table-responsive -->
				<div class="table-responsive">
					<table class="table table-striped m-b-0">
						<thead>
							<tr>
								<th>N°</th>
								<th>Nombre</th>
                                <th>Telefono</th>
                                <th>Email</th>
                                <th>Rol</th>
								<th width="1%"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(usuario, index) in usuarios" :key="index">
								<td>{{ index+1 }}</td>
								<td>{{ usuario.nombre }} {{ usuario.apellidos }}</td>
								<td>{{ usuario.telefono }}</td>
                                <td>{{ usuario.email }}</td>
                                <td v-for="rol in usuario.rol" :key="rol.id">{{ rol.nombre }}</td>
								<td class="with-btn" nowrap>
                                    <!-- <a href="#" class="btn btn-info btn-xs" @click.prevent="abrirModalModificar(usuario.id)"><i class="fa fa-unlock-alt"></i>Cambiar</a> -->
									<a href="#" class="btn btn-primary btn-xs" @click.prevent="abrirModalEditar(usuario)"><i class="fa fa-edit"></i> Editar</a>
                                    <a href="#" class="btn btn-danger btn-xs" @click.prevent="eliminar(usuario.id)"><i class="fa fa-trash"></i> Eliminar</a>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<!-- end table-responsive -->
			</div>
			<!-- end panel-body -->

		</div>
        <!-- modal de CREAR-->
		<div class="modal fade" id="nuevo">
			<div class="modal-dialog">
				<div class="modal-content">
                    <loading :active.sync="isLoading"
                    :can-cancel="false"
                    :on-cancel="onCancel"
                    :is-full-page="false"></loading>
					<div class="modal-header">
						<h4 class="modal-title">Nuevo Usuario</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Nombre</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.nombre.$model"
                                        :class="{ 'is-invalid': $v.form.nombre.$error, 'is-valid': !$v.form.nombre.$invalid }"
                                        placeholder="Ingrese el nombre"
                                        v-model="form.nombre"
                                    />
                                    <div v-if="!$v.form.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> apellidos</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.apellidos.$model"
                                        :class="{ 'is-invalid': $v.form.apellidos.$error, 'is-valid': !$v.form.apellidos.$invalid }"
                                        placeholder="Ingrese sus apellidos"
                                        v-model="form.apellidos"
                                    />
                                    <div v-if="!$v.form.apellidos.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Telefono</label>
                                        <input
                                            class="form-control"
                                            type="text"
                                            v-model.trim="$v.form.telefono.$model"
                                            :class="{ 'is-invalid': $v.form.telefono.$error, 'is-valid': !$v.form.telefono.$invalid }"
                                            placeholder="Ingrese su telefono"
                                            v-model="form.telefono"
                                        />
                                        <div v-if="!$v.form.telefono.required" class="invalid-feedback">El campo es obligatorio</div>
                                        <div v-if="!$v.form.telefono.maxLength" class="invalid-feedback">El numero de telefeno no debe tener mas de 8 digitos</div>
                                        <div v-if="!$v.form.telefono.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        v-model.trim="$v.form.email.$model"
                                        placeholder="uaurio@dominio.com"
                                        :class="{ 'is-invalid': $v.form.email.$error, 'is-valid': !$v.form.email.$invalid }"
                                        v-model="form.email"
                                    />
                                    <div v-if="!$v.form.email.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.email.email" class="invalid-feedback">Debe ingresar un email valido</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Rol</label>
                                        <select
                                            class="form-control"
                                            data-parsley-required="true"
                                            v-model="form.rol_id"
                                        >
                                        <option disabled value="">Seleccione un elemento</option>
                                        <option v-for="rol in roles" v-bind:value="rol.value" :key="rol.value">
                                            {{ rol.text }}
                                        </option>
                                        </select>
                                        <div v-if="!$v.form.rol_id.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Contraseña</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        v-model.trim="$v.form.password.$model"
                                        :class="{ 'is-invalid': $v.form.password.$error, 'is-valid': !$v.form.password.$invalid }"
                                        v-model="form.password"
                                    />
                                    <div v-if="!$v.form.password.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.password.minLength" class="invalid-feedback">El password debe tener al menos 8 caracteres</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Confirme Contraseña</label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        v-model.trim="$v.form.password_confirmation.$model"
                                        :class="{ 'is-invalid': $v.form.password_confirmation.$error, 'is-valid': !$v.form.password_confirmation.$invalid }"
                                        v-model="form.password_confirmation"
                                    />
                                    <div v-if="!$v.form.password_confirmation.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.password_confirmation.sameAs" class="invalid-feedback">Las contraseñas deben ser idénticas.</div>
                                </div>
                            </div>
                        </div>
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        <button type="button" class="btn btn-yellow no-caret" @click="agregar()" :disabled="$v.$invalid"><i class="fa fa-plus"></i> Guardar</button>
					</div>
				</div>
			</div>
		</div>
        <!-- modal de EDITAR-->
        <div class="modal fade" id="editar">
			<div class="modal-dialog">
				<div class="modal-content">
                    <loading :active.sync="isLoading"
                    :can-cancel="false"
                    :on-cancel="onCancel"
                    :is-full-page="false"></loading>
					<div class="modal-header">
						<h4 class="modal-title">Editar Usuario</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Nombre</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.nombre.$model"
                                        :class="{ 'is-invalid': $v.form.nombre.$error, 'is-valid': !$v.form.nombre.$invalid }"
                                    />
                                    <div v-if="!$v.form.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Apellidos</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.apellidos.$model"
                                        :class="{ 'is-invalid': $v.form.apellidos.$error, 'is-valid': !$v.form.apellidos.$invalid }"
                                    />
                                    <div v-if="!$v.form.apellidos.$required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Telefono</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.telefono.$model"
                                        :class="{ 'is-invalid': $v.form.telefono.$error, 'is-valid': !$v.form.telefono.$invalid }"
                                    />
                                    <div v-if="!$v.form.telefono.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.telefono.maxLength" class="invalid-feedback">El numero de telefeno no debe tener mas de 8 digitos</div>
                                    <div v-if="!$v.form.telefono.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Email</label>
                                    <input
                                        class="form-control"
                                        type="text"
                                        v-model.trim="$v.form.email.$model"
                                        :class="{ 'is-invalid': $v.form.email.$error, 'is-valid': !$v.form.email.$invalid }"
                                    />
                                    <div v-if="!$v.form.email.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.email.email" class="invalid-feedback">Debe ingresar un email valido</div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label><span style="color: red">*</span> Rol</label>
                                        <select
                                            class="form-control"
                                            data-parsley-required="true"
                                            v-model.trim="$v.form.rol_id.$model"
                                        >
                                        
                                        <option  v-for="rol in roles" :value="rol.value" :key="rol.value" >
                                            {{ rol.text }}
                                        </option>
                                        </select>
                                        <div v-if="!$v.form.rol_id.required" class="invalid-feedback">El campo es obligatorio</div>
                                </div>
                            </div>
                        </div>
                	</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        <button type="button" class="btn btn-success" @click="editar()"><i class="fa fa-check"></i> Actualizar</button>
					</div>
				</div>
			</div>
		</div>
        <!-- <div class="modal fade" id="modificar">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Cambiar Contraseña</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<form>
                            <div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Contraseña</label>
								<div class="col-sm-9">
									<input
                                        type="text"
                                        class="form-control"
                                        v-model.trim="$v.form.password.$model"
                                        :class="{ 'is-invalid': $v.form.password.$error, 'is-valid': !$v.form.password.$invalid }"
                                        autocomplete="off"
                                    />
                                    <div v-if="!$v.form.password.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.password.minLength" class="invalid-feedback">El password debe tener al menos 8 caracteres</div>
								</div>
							</div>
                            <div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Confirme Contraseña</label>
								<div class="col-sm-9">
									<input
                                        type="text"
                                        class="form-control"
                                        v-model.trim="$v.form.password_confirmation.$model"
                                        :class="{ 'is-invalid': $v.form.password_confirmation.$error, 'is-valid': !$v.form.password_confirmation.$invalid }"
                                        autocomplete="off"
                                    />
                                    <div v-if="!$v.form.password_confirmation.required" class="invalid-feedback">El campo es obligatorio</div>
                                    <div v-if="!$v.form.password_confirmation.sameAs" class="invalid-feedback">Las contraseñas deben ser idénticas.</div>
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        <button type="button" class="btn btn-yellow no-caret" @click="modificar()"><i class="fa fa-plus"></i>Actualizar</button>
					</div>
				</div>
			</div>
		</div> -->
    </div>
</template>
<script>
import { required, email, sameAs, numeric, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'
import * as utils from '../../../utils/utils'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'IndexView',
    data(){
        return {
            isLoading: false,
            fullPage: true,
            form:{
                id:'',
                nombre:'',
                apellidos:'',
                telefono:'',
                email:'',
                password:'',
                password_confirmation:'',
                rol_id:'',
                id_restaurante: '',
            },
            
            roles: [
                { text: 'Administrador', value: '2' },
                { text: 'Empleado1', value: '3' },
                { text: 'Empleado2', value: '4' }
            ],
        }
    },
    components: {
		Loading
	},
    validations: {
        form: {
            nombre: { required },
            apellidos: { required },
            telefono: { required, numeric, maxLength: maxLength(8) },
            email: { required, email },
            rol_id: {required},
            password: { required, maxLength: minLength(8) },
            password_confirmation: { required, sameAsPassword: sameAs('password') }
        }
    },
    computed:{
        ...mapGetters('usuarios', ['usuarios']),
        ...mapGetters('auth', ['user']),
    },
    methods:{
        ...mapActions('usuarios', ['getUsuarios','addUsuario','editUsuario','deleteUsuario','ModificarUsuario']),
        editar(){
            this.doAjax();
            this.editUsuario(this.form).then(response =>{
                $('#editar').modal('hide');
                this.form.nombre='',
                this.form.apellidos='',
                this.form.telefono='',
                this.form.email='',
                this.$swal.fire('Exito!', 'Registro actualizado exitosamente.', 'success');
                this.getUsuarios(this.user.id)
            }).catch( error => {
                console.log(error);
                this.$swal.fire('Ops!', utils.showErrors(error.response.data.errors), 'error');
            })
        },
        agregar(){
            this.doAjax();
            this.addUsuario(this.form).then( () => {
                $('#nuevo').modal('hide');
                this.form.nombre = '';
                this.form.apellidos='';
                this.form.telefono='';
                this.form.email='';
                this.form.rol_id= '';
                this.form.password='';
                this.form.password_confirmation='';
                this.$swal.fire('Exito!', 'Registro creado exitosamente.', 'success');
                this.getUsuarios(this.user.id)
            }).catch( error => {
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
                    this.deleteUsuario(id).then( response => {
                        this.$swal.fire('Eliminado!', 'El registro fue eliminado.', 'success');
                        this.getUsuarios(this.user.id)
                    }).catch( error => {
                        this.$swal.fire('Ops!', 'Algo salio mal.', 'error');
                    })
                }
            })
        },
        modificar(){
            this.ModificarUsuario(this.form).then(response =>{
                $('#modificar').modal('hide');
                this.form.password='',
                this.form.password_confirmation='',
                this.$swal.fire('Exito!', 'Registro actualizado exitosamente.', 'success');
                this.getUsuarios(this.user.id)
            }).catch( error => {
                console.log(error);
                this.$swal.fire('Ops!', utils.showErrors(error.response.data.errors), 'error');
            })
        },
        abrirModalNuevo(){
            this.form.nombre = '';
            this.form.apellidos='';
            this.form.telefono='';
            this.form.email='';
            this.form.password='';
            this.form.password_confirmation='';
            this.form.id_restaurante = this.user.id;
            this.$v.form.$reset();
            $('#nuevo').modal({backdrop: 'static', keyboard: false, show: true});
        },
        abrirModalEditar(form){
            this.form.id = form.id;
            this.form.nombre = form.nombre;
            this.form.apellidos= form.apellidos;
            this.form.telefono= form.telefono;
            this.form.email=form.email;
            this.form.id_restaurante = this.user.id;
            this.form.rol_id = form.rol[0].id;
            this.$v.form.$reset();
            $('#editar').modal({backdrop: 'static', keyboard: false, show: true});
        },
        abrirModalModificar(form){
            this.form.password=form.password;
            this.form.password_confirmation=form.password_confirmation;
            $('#modificar').modal({backdrop: 'static', keyboard: false, show: true});
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
    mounted(){
       this.getUsuarios(this.user.id)
      
    }


}
</script>
