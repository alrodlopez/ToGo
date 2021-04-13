<template>

<div>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
    <link href="/../static/assets/plugins/smartwizard/dist/css/smart_wizard.css" rel="stylesheet" />
    <h1>Restaurante</h1>
    
    <div class="row">
        <div class="col-xl-3 col-sm-6">
    <a href="#modal-dialog" class="btn btn-lg btn-primary" data-toggle="modal">
        <span class="d-flex align-items-center text-left">
            <i class="fas fa-plus-circle fa-3x mr-3 text-white"></i>
        <span>
            <span class="d-block mb-n1"><b>Agregar Restaurante</b></span>
            
        </span>
         </span>
    </a>
    </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-xl-3 col-sm-6">
            <div class="card border-purple">
                <img class="card-img-top" src="/../../static/assets/img/gallery/gallery-1.jpg" alt="">
                <div class="card-body">
                    <h4 class="card-title m-t-0 m-t-10">Restaurante 1</h4>
                    <p>Descripcion</p>
                    <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                    <a href="" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-sm-6">
            <div class="card border-badge">
                <img class="card-img-top" src="/../../static/assets/img/gallery/gallery-1.jpg" alt="">
                <div class="card-body">
                    <h4 class="card-title m-t-0 m-t-10">Restaurante 2</h4>
                    <p>Descripcion</p>
                    <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                    <a href="" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div>

         <div class="col-xl-3 col-sm-6">
            <div class="card border-badge">
                <img class="card-img-top" src="/../../static/assets/img/gallery/gallery-1.jpg" alt="">
                <div class="card-body">
                    <h4 class="card-title m-t-0 m-t-10">Restaurante 3</h4>
                    <p>Descripcion</p>
                    <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                    <a href="" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div>

         <div class="col-xl-3 col-sm-6">
            <div class="card border-badge">
                <img class="card-img-top" src="/../../static/assets/img/gallery/gallery-1.jpg" alt="">
                <div class="card-body">
                    <h4 class="card-title m-t-0 m-t-10">Restaurante 3</h4>
                    <p>Descripcion</p>
                    <a href="" class="btn btn-sm btn-primary"><i class="fas fa-edit"></i></a>
                    <a href="" class="btn btn-sm btn-danger"><i class="fas fa-trash"></i></a>
                </div>
            </div>
        </div>

        
    </div>

    <!-- #modal-dialog -->
	<div class="modal fade" id="modal-dialog">
		<div class="modal-dialog modal-lg">
			<div class="modal-content">
				<div class="modal-header">
				    <h4 class="modal-title">Modal Dialog</h4>
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				</div>
				<div class="modal-body">
					<div class="col-xl-12">
					<!-- begin panel -->
                    <form action="/" method="POST" class="form-control-with-bg">
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
							<fieldset>
								<!-- begin row -->
								<div class="row">
									<!-- begin col-8 -->
									<div class="col-xl-8 offset-xl-2">
										<legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">Personal info sobre el Restaurante</legend>
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Nombre *</label>
											<div class="col-lg-9 col-xl-6">
												<input type="text" name="nombre" placeholder="Required" class="form-control" />
											</div>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Direccion *</label>
											<div class="col-lg-9 col-xl-6">
												<input type="text" name="direccion" placeholder="Required" class="form-control" />
											</div>
										</div>
                                        <div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Telefono *</label>
											<div class="col-lg-9 col-xl-6">
												<input type="text" name="telefono" placeholder="Required" class="form-control" />
											</div>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Logo</label>
											<div class="col-lg-9 col-xl-6">
												<input type="file" name="logo" placeholder="Required" class="form-control" />
											</div>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Descripcion</label>
											<div class="col-lg-9 col-xl-6">
												<textarea rows="4" name="descripcion" placeholder="" class="form-control" />
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
									<div class="col-xl-10 offset-xl-2">
										<legend class="no-border f-w-700 p-b-0 m-t-0 m-b-20 f-s-16 text-inverse">Horario de atencion y dias que se atienden</legend>
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Horario Atencion</label>
											<div class="col-lg-9 col-xl-3">
												<input type="time" name="phone" placeholder="00:00" class="form-control" />
											</div>
                                            <div class="col-lg-9 col-xl-3">
												<input type="time" name="phone" placeholder="00:00" class="form-control" />
											</div>
										</div>
                                        <div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Dias de Atencion</label>
                                            <div class="col-lg-10 col-xl-7">
											<div class="form-check form-check-inline ">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">L</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">M</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">M</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">J</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">V</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">S</label>
										    </div>
                                            <div class="form-check form-check-inline">
											<input type="checkbox" value="" id="checkbox-inline-1" class="form-check-input" />
											<label class="form-check-label" for="checkbox-inline-1">D</label>
										    </div>
                                            </div>
										</div>
										<!-- end form-group row -->
										<!-- begin form-group row -->
										<div class="form-group row m-b-10">
											<label class="col-lg-3 text-lg-right col-form-label">Tiempo Elaboracion</label>
											<div class="col-lg-9 col-xl-6">
												<input type="time" name="tiempo_elaboracion" placeholder="00:00" class="form-control" />
											</div>
                        
										</div>
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
								<h2 class="display-4">Finalizando registro</h2>
								<p class="lead mb-4">Su registro esta a punto de completarse, si quiere hacer algun cambio puede revisar los datos, si no presione el boton "Confirmar Registro". </p>
								<p><a href="javascript:;" class="btn btn-primary btn-lg">Confirmar Registro</a></p>
							</div>
						</div>
						<!-- end step-4 -->
					</div>
					<!-- end wizard-content -->
				</div>
				<!-- end wizard -->
			</form>
			<!-- end wizard-form -->
		</div>
						
					
					<!-- end panel -->
				</div>
				<!-- end col-6 -->

				</div>
				<div class="modal-footer">
					<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Close</a>
					<a href="javascript:;" class="btn btn-success">Action</a>
				</div>
			</div>
		</div>
</div>

</template>

