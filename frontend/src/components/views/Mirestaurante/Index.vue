<template>
<div>
    <h4>To Go Restaurant</h4>
	<div class="row vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="false" 
        :on-cancel="onCancel"
        :is-full-page="false"></loading>
	<div class="col-xl-8">
		<div class="widget-chart with-sidebar inverse-mode">
			<div class="widget-chart-content bg-white">
				<h1 class=" text-inverse">
					<strong>{{restaurant.nombre}}</strong>
				</h1>	
			<p class="lead"> <strong>Direccion:</strong> <span class="badge bagde-danger"> {{ restaurant.direccion}}</span></p>
            <p class="lead"> <strong>Telefono:</strong> <span class="badge bagde-danger"> {{ restaurant.telefono }}</span></p> 
			<p class="lead"><strong>Email:</strong> <span class="badge bagde-danger">{{restaurant.email}}</span></p>
			<p class="lead"><strong>Categorias: </strong><span class="badge bagde-danger" v-for="categorias in restaurant.categorias" :key="categorias.id"> {{ categorias.nombre }} </span></p>
			</div>
		</div>
	</div>
	<div class="col-xl-4">
		<div class="panel panel-inverse" data-sortable-id="index-1">
			<img v-bind:src="restaurant.logo" class="img" width="285"  />
		</div>
	</div>
	</div>
    <ul class="result-list" >
		<div class="result-info">
			<div class="panel-body" style="height: 280px;">
                <l-map

                	:zoom="zoom"
                    :center="center"
                    :options="mapOptions"
                    style="height: 100%"
                    @update:center="centerUpdate"
                    @update:zoom="zoomUpdate"
                >
                <l-tile-layer :url="url" :attribution="attribution"/>
                <l-marker :lat-lng="markerPos1" >
                        <l-popup>
                            <div @click="innerClick">
                                {{restaurant.nombre}}
                                <p v-show="showParagraph">
                                </p>
                            </div>
                        </l-popup>
                    </l-marker>    
	            </l-map>
            </div>
		</div>
		<hr>
		<div class="result-price">
			<a href="#" class="btn btn-yellow btn-block" @click.prevent="abrirModal(restaurant)">Editar datos del Restaurante</a>
		</div>
	
    </ul>
	<!-- #modal-dialog -->
	
	<div class="modal fade" id="editar" >
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
				    <h4 class="modal-title">Editar datos del Restaurante</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				</div>
				<div class="modal-body" data-sortable-id="form-plugins-15">
					<div class="col-xl-12">
					<!-- begin panel -->
                 	<div class="row">
						<div class="col-xl-8 offset-xl-2">
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
									<div v-if="!$v.restaurante.telefono.required" class="invalid-feedback">El campo es obligatorio</div>
                    				<div v-if="!$v.restaurante.telefono.maxLength" class="invalid-feedback">El numero de telefeno no debe tener mas de 8 digitos</div>
                    				<div v-if="!$v.restaurante.telefono.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
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
								<label class="col-lg-3 text-lg-right col-form-label">ubicacion *</label>
								<div class="col-lg-9 col-xl-6">
									<input 
										type="text"
										v-model.trim="markerPos2"
										readonly
										:class="{ 'is-invalid': $v.restaurante.ubicacion.$error, 'is-valid': !$v.restaurante.ubicacion.$invalid }"
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
							</div>
							<div  class="form-group row m-b-10">
								<label class="col-lg-3 text-lg-right col-form-label">Categorias</label>
								<div class="col-lg-9 col-xl-6" >
								<a-select
    								mode="multiple"
    								:default-value="this.seleccionadas"
    								style="width: 100%"
    								placeholder="Please select"
    								@change="handleChange"
  								>
								<a-select-option  v-for="categoria in categorias" :key="categoria.id">
      								{{ categoria.nombre }}
    							</a-select-option>
  								</a-select>
								</div>
							</div> 
							<div class="form-group row m-b-10" hidden="true">
								<div class="form-group row" >
									<label class="col-lg-4 col-form-label">Categorias seleccionadas</label>
									<div class="col-lg-8">
										
											<li>{{this.seleccionadas}}</li>
											<li>Tag2</li>
									</div>
								</div>
							</div>
							<!-- begin form-group row -->
							<div class="form-group row m-b-10">
								<label class="col-lg-3 text-lg-right col-form-label">Descripcion</label>
								<div class="col-lg-9 col-xl-6">
									<textarea
										rows="4"
										
										v-model.trim="$v.restaurante.descripcion.$model"
										
										:class="{ 'is-invalid': $v.restaurante.descripcion.$error, 'is-valid': !$v.restaurante.descripcion.$invalid }"
                       					autocomplete="off"
										class="form-control" 		  
									/>
								</div>
							</div>
						</div>

                        <div class="col-xl-12 col-lg-6">
							<div class="m-b-10 f-s-10 m-t-10">
								<b class="text-inverse">Para elegir una nueva ubicacion haga doble click en su nueva direccion o arrastre el marcador</b>
							</div>

							<div class="col-xl-12 col-lg-6" style="height: 360px;">
                			<l-map
								@dblclick="nuevoMarker"
								ref="myMap"
								:zoom="zoom"
								:center="center"
								:options="mapOptions"
								style="height: 100%"
								@update:center="centerUpdate"
								@update:zoom="zoomUpdate"
								
							>
							<l-tile-layer :url="url2" :attribution="attribution"/>
							<l-marker :lat-lng="markerPos1" >
									<l-popup>
										<div @click="innerClick">
											{{restaurant.nombre}}
											<p v-show="showParagraph">
										
											</p>
										</div>
									</l-popup>
							</l-marker>    
							<l-marker :lat-lng="markerPos2" :options="{draggable}"  @dragend="setCustomMarkerPosition" >
										<l-popup>
											<div @click="innerClick">
												Su nueva ubicacion
											</div>
										</l-popup>
							</l-marker>
							</l-map>	
                			</div>
						</div>
				</div>		
		</div>
				</div>
					<div class="modal-footer">
                        <a href="#" class="btn btn-white" data-dismiss="modal"><i class="fa fa-ban"></i> Cancelar</a>
                        <a class="btn btn-primary" @click="editar()" :disabled="$v.$invalid"> Confirmar Cambios </a>
                    </div>
				</div>	
			</div>
		</div> 
</div>

</template>
 
<script>
import { mapGetters, mapActions } from 'vuex'
import { required, email, numeric, maxLength, } from 'vuelidate/lib/validators'
import * as utils from '../../../utils/utils'
import { latLng } from "leaflet"
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
	
export default {
	
	name: 'IndexView',
	components: {
    LMap,
    LTileLayer,
    LMarker,
  	},
	data() {
		return {	
			restaurante: { 
				id: '',
				nombre: '',
				direccion: '',
				telefono: '',
				email: '',
				logo: '',
				descripcion: '',
				ubicacion: [],
				categorias: [],
								
			},
			seleccionadas: [],
			categoria: {
				id: '',
				nombre: '',
				
			},
			isLoading: false,
            fullPage: true,

			
			lat: '',
            lng: '',
			zoom: 13,
			center: latLng('',''),
			url2: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ec467e34aa554ac1803b889e694edce7',
      		url: 'https://tile.thunderforest.com/outdoors/{z}/{x}/{y}.png?apikey=ec467e34aa554ac1803b889e694edce7',
      		attribution:
        		'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      		withPopup: latLng(-17.957639,-67.104725),
     		withTooltip: latLng(-17.957639,-67.104725),
      		currentZoom: 10,
      		currentCenter:latLng(-17.957639,-67.104725),
			showParagraph: false, 
			markerPos1: latLng('',''),
			markerPos2: latLng(-17.957639,-67.104725),
			
			draggable: true,
			 
      		mapOptions: {
				zoomSnap: 0.1,
				doubleClickZoom: false
			  },
			
			  showMap: true,
			
			
		}
		
	},
	components: {
		Loading
	},
	validations: {
        restaurante: {
			nombre: { required },
			direccion: { required },
			telefono: { required, numeric, maxLength: maxLength(8) },
			email: { required, email },
			
			descripcion: { required },
			ubicacion: {required},
        }
    },
	computed: {
		...mapGetters('restaurante',['restaurant']),
		...mapGetters('categorias',['categorias']),
		...mapGetters('auth', ['user']),
		imagen(){
			return this.imagenMiniatura;
		},
		
	},
	methods: {
		...mapActions('restaurante',['getRestaurante','editRestaurante']),
		...mapActions('categorias',['getCategorias']),
		editar(){
			let formData = new FormData();
			formData.append('id',JSON.stringify(this.restaurante.id));
			formData.append('nombre',this.restaurante.nombre);
			formData.append('direccion',this.restaurante.direccion);
			formData.append('telefono',this.restaurante.telefono);
			formData.append('email',this.restaurante.email);
			if(this.restaurante.logo != '')
			formData.append('logo',this.restaurante.logo);
			formData.append('descripcion',this.restaurante.descripcion);
			for(var i=0;i<this.seleccionadas.length;i++){
				formData.append('categorias[]',JSON.stringify(this.seleccionadas[i]));
			};
			//;
			formData.append('ubicacion[latitude]',this.markerPos2.lat);
			formData.append('ubicacion[longitude]',this.markerPos2.lng);
			
			
			this.editRestaurante(formData,1).then( response => {
				setTimeout(this.obtenerUbicacionMarker1,2000)
				this.markerPos1 = this.markerPos2;
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
			
			this.restaurante.descripcion = restaurante.descripcion;
			this.restaurante.ubicacion = [restaurante.ubicacion.latitude, restaurante.ubicacion.longitude];
			this.markerPos2 = [restaurante.ubicacion.latitude, restaurante.ubicacion.longitude];
			//this.restaurante.categorias = restaurante.categorias[0].id;
			this.currentCenter = [restaurante.ubicacion.latitude, restaurante.ubicacion.longitude];
			this.center = [restaurante.ubicacion.latitude, restaurante.ubicacion.longitude];
			this.center2=latLng(-17.957639,-67.104725),
			$('#editar').modal({backdrop: 'static', keyboard: false, show: true});
			this.obtenerUbicacionMarker1();
			$('#editar').on('shown.bs.modal',function(){
        			setTimeout(function() { window.dispatchEvent(new Event('resize')) }, 250);
			});
		},
		handleChange(value) {
			this.seleccionadas = value
      	console.log(`selected ${value}`);
    	},
		onChange(event){
			this.restaurante.categorias.push(event.target.value)
			
		},
		obtenerImagen(e){
			this.restaurante.logo = this.$refs.file.files[0];	
		},
		zoomUpdate(zoom) {
      		this.currentZoom = zoom;
   	 	},
    	centerUpdate(center) {
      		this.currentCenter = center;
    	},
    	showLongText() {
      		this.showParagraph = !this.showParagraph;
    	},
    	innerClick() {
      		alert("Click!");
		},
		latlng(lat, lng){
            return latLng(lat, lng);
		},
		obtenerUbicacionMarker1(){
			this.lat = this.restaurant.ubicacion.latitude;
			this.lng = this.restaurant.ubicacion.longitude;
			this.markerPos1 = latLng(this.lat, this.lng)
			this.markerPos2 = latLng(this.lat, this.lng)
			this.center = latLng(this.lat, this.lng)
		},
		
		nuevoMarker(e){
			let valores = e.latlng;
			let lat = valores.lat;
			let lng = valores.lng;
			this.markerPos2 = latLng(lat,lng);	
		},
		setPos(e){
			const layer = e.target
			const ll = layer.getLatLng()
			layer.setLatLng(ll)
			return[ll.lat,ll.lng]
			//console.log('ok'+ll)
		},
		setMarkerPosition(e){
			this.markerPos1 = this.setPos(e)
		},
		setCustomMarkerPosition(e){
			this.markerPos2 = this.setPos(e)
		},
		
		getUbicacion(){
			let lat  = this.restaurant.ubicacion.latitude;
			let lon = this.restaurant.ubicacion.longitude;
		 	this.currentCenter = latLng(lat, lon);
			this.center = latLng(lat, lon);
			this.markerPos1 = latLng(lat, lon);
			this.markerPos2 = latLng(lat, lon);
		},
		listarCategorias(){
			return this.restaurant.categorias.filter(restaurante => categorias.categorias_id  === restaurant.categorias.id)
		},
		categoriasSel(){
			for(let i=0;i<this.restaurant.categorias.length;i++){
				this.seleccionadas.push(this.restaurant.categorias[i].id)
			}
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
	created() {
		
	},
	mounted() {
		
		this.getRestaurante(this.user.restaurante)
		setTimeout(this.categoriasSel,2000)
		this.getCategorias()
		setTimeout(this.obtenerUbicacionMarker1,2000)
		this.doAjax()
	  
	},
	
}



</script>
