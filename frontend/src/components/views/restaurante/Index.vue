<template>
<div>
	
    <link href="../../../../static/assets/plugins/smartwizard/dist/css/smart_wizard.css" rel="stylesheet" />
	<link href="../../../../static/assets/plugins/tag-it/css/jquery.tagit.css" rel="stylesheet" />
	
    
    <h4>Mi Restaurante</h4>
    <ul class="result-list" >
    <li>
		<a href="#" class="result-image" style="background-image: url(/../../static/assets/img/gallery/gallery-1.jpg); width:100% "></a>
		<div class="result-info">
			
			<h4 class="title"><a href="javascript:;">{{restaurant.nombre}}</a></h4>
			<p class="location">{{ restaurant.direccion}}</p>
            <p class="numero">{{ restaurant.telefono }}</p> 
			<p class="desc">
				{{ restaurant.descripcion }}
			</p>
            <p class="numero">Tiempo de entrega: 30 min</p>
            <p class="numero">Atencion dias: Lunes, martes, miercoles, jueves, viernes, sabado</p>
            <p class="numero">Atencion de 09:00 a 21:00</p>
			<div id="mapid" style="height: 300px"></div>
			<div class="m-b-10 f-s-10 m-t-10">
				<a href="#modal-widget-map" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal">source code</a>
				<b class="text-inverse">Ubicacion</b>
			</div>
				<div class="widget-map widget-map-rounded m-b-30" data-id="widget">
					<!-- begin widget-input-container -->
					<div class="widget-input-container">
						<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-ellipsis-v"></i></a></div>
						<div class="widget-input-box">
							<input type="text" class="form-control" placeholder="Search here">
						</div>
						<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-microphone"></i></a></div>
						<div class="widget-input-divider"></div>
						<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-location-arrow"></i></a></div>
					</div>
					<!-- end widget-input-container -->
					<!-- begin widget-map-body  LEAFLET MAPA-->
					<div class="widget-map-body">

					</div>
					<!-- end widget-map-body -->
					<!-- begin widget-map-list -->
					<div class="widget-map-list">
						<div class="widget-list widget-list-rounded m-b-30">
							<!-- begin widget-list-item -->
							
							<!-- end widget-list-item -->
						</div>
					</div>
					<!-- end widget-map-list -->
				</div>
				<!-- end widget-map -->
			<div class="btn-row">
				<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Analytics"><i class="fa fa-fw fa-chart-bar"></i></a>
				<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Tasks"><i class="fa fa-fw fa-tasks"></i></a>
				<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Configuration"><i class="fa fa-fw fa-cog"></i></a>
				<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Performance"><i class="fa fa-fw fa-tachometer-alt"></i></a>
				<a href="javascript:;" data-toggle="tooltip" data-container="body" data-title="Users"><i class="fa fa-fw fa-user"></i></a>
			</div>
		</div>
		<div class="result-price">
			<img src="/../../static/assets/img/gallery/gallery-1.jpg" class="img-rounded height-100" />

			<a href="#" class="btn btn-yellow btn-block" @click.prevent="abrirModal(restaurant)">Editar datos del Restaurante</a>
			
		</div>
	</li>
    </ul>

	<!-- #modal-dialog -->
	<div class="modal fade" id="editar">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
				    <h4 class="modal-title">Editar Restaurante</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				</div>
				<div class="modal-body">
					<div class="col-xl-12">
					<!-- begin panel -->
                 
				<!-- begin wizard -->
				<div id="wizard">
					<!-- begin wizard-step -->
					<ul>
						<li>
							<a href="#step-1">
								<span class="number">1</span> 
								<span class="info">
									Personal Info
									<small>Nombre, Direccion, Telefono</small>
								</span>
							</a>
						</li>
						<li>
							<a href="#step-2">
								<span class="number">2</span> 
								<span class="info">
									Horario de Atencion
									<small>Incluye ubicacion</small>
								</span>
							</a>
						</li>
						<li>
							<a href="#step-3">
								<span class="number">3</span>
								<span class="info">
									Completo
									<small>Confirmar registro</small>
								</span>
							</a>
						</li>
						
					</ul>
					<!-- end wizard-step -->
					<!-- begin wizard-content -->
					<div>
						<!-- begin step-1 -->
						<div id="step-1">
							<!-- begin fieldset -->
							<fieldset >
								<!-- begin row -->
								<div class="row">
									<!-- begin col-8 -->
									<div class="col-xl-8 offset-xl-2">
										<legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">Personal info sobre el Restaurante</legend>
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Nombre *</label>
											<div class="col-lg-9 col-xl-6">
												<input 
													type="text"
													
													v-model.trim="$v.restaurante.nombre.$model"
													class="form-control"
													:class="{ 'is-invalid': $v.restaurante.nombre.$error, 'is-valid': !$v.restaurante.nombre.$invalid }"
                                					autocomplete="off"
												/>
												<div v-if="!$v.restaurante.nombre.$required" class="invalid-feedback">El campo Nombre es obligatorio</div>
											</div>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Direccion *</label>
											<div class="col-lg-9 col-xl-6">
												<input 
													type="text"
													v-model.trim="$v.restaurante.direccion.$model"
													
													:class="{ 'is-invalid': $v.restaurante.direccion.$error, 'is-valid': !$v.restaurante.direccion.$invalid }"
                                					autocomplete="off"
													class="form-control" 
												/>
												<div v-if="!$v.restaurante.direccion.$required" class="invalid-feedback">El campo Nombre es obligatorio</div>

											</div>
										</div>
                                        <div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Telefono *</label>
											<div class="col-lg-9 col-xl-6">
												<input 
													type="text"
													v-model.trim="$v.restaurante.telefono.$model"
													
													:class="{ 'is-invalid': $v.restaurante.telefono.$error, 'is-valid': !$v.restaurante.telefono.$invalid }"
                                					autocomplete="off"
													class="form-control" 
													  
												/>
											</div>
										</div>
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Email *</label>
											<div class="col-lg-9 col-xl-6">
												<input 
													type="text"
													v-model.trim="$v.restaurante.email.$model"
													
													:class="{ 'is-invalid': $v.restaurante.email.$error, 'is-valid': !$v.restaurante.email.$invalid }"
                                					autocomplete="off"
													class="form-control" 
													  
												/>
											</div>
										</div>
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Logo *</label>
											<div class="col-lg-9 col-xl-6">
												<input 
													type="file"
													name="logo"
													ref="file"
													@change="obtenerImagen"
													
													class="form-control" 
													  
												/>
											</div>
											<figure>
												<img with="200" height="200" :src="imagen">
											</figure>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										
										<!-- end form-group row -->
										<div  class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Categorias</label>
											<div class="col-lg-9 col-xl-6">
											
											<select @change="onChange($event)" class="form-control selectpicker" data-size="10" data-live-search="true" data-style="btn-primary">
												<option value="" selected disabled>Selecciones las categorias</option>
												<option v-for="categoria in categorias" :value="categoria.id" :key="categoria.id">{{ categoria.nombre }}</option>
										
											</select>
									
											</div>
										</div> 
										<div class="form-group row m-b-10">
											<!--<label class="col-lg-3 text-lg-right col-form-label">Categorias</label>
											<div class="col-lg-9 col-xl-6">
												<ul id="jquery-tagIt-primary" class="primary">
												<li v-for="categoria in categorias" :key="categoria.id">{{categoria.nombre}}</li>
												
												</ul>
											</div>-->
											<div class="form-group row">
												<label class="col-lg-4 col-form-label">Categorias seleccionadas</label>
												<div class="col-lg-8">
													<ul id="jquery-tagIt-default">
														<li>{{restaurante.categorias}}</li>
														<li>Tag2</li>
													</ul>
													<p>Try to enter "c++, java, php" </p>
												</div>
											</div>
										</div>
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Descripcion</label>
											<div class="col-lg-9 col-xl-6">
												<textarea
													rows="4"
													
													v-model="$v.restaurante.descripcion.$model"
													
													:class="{ 'is-invalid': $v.restaurante.descripcion.$error, 'is-valid': !$v.restaurante.descripcion.$invalid }"
                                					autocomplete="off"
													class="form-control" 
													  
												/>
											</div>
										</div>
                                        
										<!-- end form-group row -->
										
									</div>
									<!-- end col-8 -->
								</div>
								<!-- end row -->
							</fieldset>
							<!-- end fieldset -->
						</div>
						<!-- end step-1 -->
						<!-- begin step-2 -->
						<div id="step-2">
							<!-- begin fieldset -->
							<fieldset>
								<!-- begin row -->
								<div class="row">
									<!-- begin col-8 -->
									<div class="col-xl-8 offset-xl-2">
										<legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">Horario de atencion y dias que se atienden</legend>
										<!-- begin form-group row -->
								<!--		<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Horario Atencion</label>
											<div class="col-lg-9 col-xl-3">
												<input type="time" name="phone" placeholder="00:00" class="form-control" />
											</div>
                                            <div class="col-lg-9 col-xl-3">
												<input type="time" name="phone" placeholder="00:00" class="form-control" />
											</div>
										</div>-->
                                 <!--       <div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Dias de Atencion</label>
                                            
											<div class="col-md-9">
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox10" value="" />
													<label for="cssCheckbox10">Lunes</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox20" value=""  />
													<label for="cssCheckbox20">Martes</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox30" value="" />
													<label for="cssCheckbox30">Miercoles</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox40" value="" />
													<label for="cssCheckbox40">Jueves</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox50" value="" />
													<label for="cssCheckbox50">Viernes</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox60" value="" />
													<label for="cssCheckbox60">Sabado</label>
												</div>
												<div class="checkbox checkbox-css">
													<input type="checkbox" id="cssCheckbox70" value="" />
													<label for="cssCheckbox70">Domingo</label>
												</div>
											
											
                                            </div>
										</div>-->
										<!-- end form-group row -->
										<!-- begin form-group row -->
								<!--		<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Tiempo Elaboracion</label>
											<div class="col-lg-9 col-xl-6">
												<input type="time" name="tiempo_elaboracion" placeholder="00:00" class="form-control" />
											</div>
                        
										</div>-->
										<!-- end form-group row -->

                                        <div class="col-xl-12 col-lg-6">
										<!-- begin widget-map -->
										<div class="m-b-10 f-s-10 m-t-10">
											<a href="#modal-widget-map" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal">source code</a>
											<b class="text-inverse">Ubicacion</b>
										</div>
										<div class="widget-map widget-map-rounded m-b-30" data-id="widget">
											<!-- begin widget-input-container -->
											<div class="widget-input-container">
												<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-ellipsis-v"></i></a></div>
												<div class="widget-input-box">
													<input type="text" class="form-control" placeholder="Search here">
												</div>
												<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-microphone"></i></a></div>
												<div class="widget-input-divider"></div>
												<div class="widget-input-icon"><a href="#" class="text-grey" data-id="widget-elm" data-light-class="text-grey" data-dark-class="text-white"><i class="fa fa-location-arrow"></i></a></div>
											</div>
											<!-- end widget-input-container -->
											<!-- begin widget-map-body -->
											<div class="widget-map-body">
												<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5650178360584!2d-122.41879278478642!3d37.77679637975903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2smy!4v1524046379645" width="100%" height="230" frameborder="0" style="border:0" allowfullscreen></iframe>
											</div>
											<!-- end widget-map-body -->
											<!-- begin widget-map-list -->
											<div class="widget-map-list">
												<div class="widget-list widget-list-rounded m-b-30">
													<!-- begin widget-list-item -->
										
													<!-- end widget-list-item -->
												</div>
											</div>
											<!-- end widget-map-list -->
										</div>
										<!-- end widget-map -->
										</div>

									</div>
									<!-- end col-8 -->
								</div>
								<!-- end row -->
							</fieldset>
							<!-- end fieldset -->
						</div>
						<!-- end step-2 -->
						<!-- begin step-3 -->
						
						<!-- end step-3 -->
						<!-- begin step-4 -->
						<div id="step-3">
							<div class="jumbotron m-b-0 text-center">
								<h2 class="display-4">Finalizando cambios</h2>
								<p class="lead mb-4">Sus cambios estan a punto de completarse, si quiere hacer algun cambio mas puede revisar los datos, si no presione el boton "Confirmar Cambios". </p>
								<p><button type="button" class="btn btn-primary btn-lg" @click="editar()" :disabled="$v.$invalid"> Confirmar Cambios </button></p>
							</div>
						</div>
						<!-- end step-4 -->
					</div>
					<!-- end wizard-content -->
				</div>
				<!-- end wizard -->
			
			<!-- end wizard-form -->
		</div>
						
					
					<!-- end panel -->
				</div>
				<!-- end col-6 -->
					<div class="modal-footer">
                        <a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        
                    </div>
				</div>
				
			</div>
		</div>


</div>

</template>
 
<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import * as utils from '../../../utils/utils'
export default {
	name: 'IndexView',
	data() {
		return {
			imagenMiniatura: '',
			restaurante: { 
				id: '',
				nombre: '',
				direccion: '',
				telefono: '',
				email: '',
				logo: 'logo.jpg',
				descripcion: '',
				ubicacion: {latitude:'-52.45877',longitude:'-64.51468'},
				categorias: []

			},
			categoria: {
				id: '',
				nombre: '',
			},
			
		}
	},
	validations: {
        restaurante: {
			nombre: { required },
			direccion: { required },
			telefono: { required },
			email: { required },
			
			descripcion: { required }
        }
    },
	computed: {
		...mapGetters('restaurante',['restaurant']),
		...mapGetters('categorias',['categorias']),
		imagen(){
			return this.imagenMiniatura;
		},
		
	},
	methods: {
		...mapActions('restaurante',['getRestaurante','editRestaurante']),
		...mapActions('categorias',['getCategorias']),
		editar(){
			const formData = new FormData();
			formData.append('nombre',this.restaurante.nombre),
			formData.append('direccion',this.restaurante.direccion),
			formData.append('telefono',this.restaurante.telefono),
			formData.append('email',this.restaurante.email),
			formData.append('logo',this.restaurante.logo),
			formData.append('descripcion',this.restaurante.descripcion),
			formData.append('categorias',this.restaurante.categorias),
			
			
			this.editRestaurante(this.formData).then( response => {
				$('#editar').modal('hide');
				
				
				this.$swal.fire('Exito!','Datos actualizados exitosamente.','success');

			}).catch( error => {
				console.log(error);
				this.$swal.fire('Ops!', utils.showErrors(error.response.data.errors), 'error');
			})
		},
		abrirModal(restaurante){
            this.restaurante.id = restaurante.id;
			this.restaurante.nombre = restaurante.nombre;
			this.restaurante.direccion = restaurante.direccion;
			this.restaurante.telefono = restaurante.telefono;
			this.restaurante.email = restaurante.email;
			this.restaurante.logo = restaurante.logo;
			this.restaurante.descripcion = restaurante.descripcion;
            $('#editar').modal({backdrop: 'static', keyboard: false, show: true});
		},
		onChange(event){
			this.restaurante.categorias.push(event.target.value)
			
		},
		obtenerImagen(e){
			//let file = e.target.files[0];
			this.restaurane.logo = this.$refs.file.files[0];	
			//this.restaurante.logo = file;
			//console.log(file);
			this.cargarImagen(this.restaurante.logo);
		},
		cargarImagen(file){
			let reader = new FileReader();
			reader.onload = (e) => {
				this.restaurante.logo = e.target.result;
			}
			reader.readAsDataURL(file);
		}
	},
	mounted() {
		this.getRestaurante(),
		this.getCategorias()

	},
}

/*var tilesProvider = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
let mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer(tilesProvider,{
	maxZoom: 18,
}),addTo(mymap)*/

</script>
