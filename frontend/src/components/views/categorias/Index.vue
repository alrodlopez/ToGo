<template>
    <div>
        <!-- begin input-group -->
		<div class="input-group input-group-lg mb-3">
			<input type="text" class="form-control input-white" placeholder="Enter keywords here..." />
			<div class="input-group-append">
				
				<button type="button" class="btn btn-primary"><i class="fa fa-search fa-fw"></i> Search</button>
				<a href="#modal-dialog" type="button" class="btn btn-primary" data-toggle="modal"><i class="fas fa-plus-circle fa-fw"></i> Nuevo</a>
			</div>
		</div>
		<!-- end input-group -->
        <!-- begin panel -->
		<div class="panel panel-inverse" data-sortable-id="table-basic-7">
			<!-- begin panel-heading -->
			<div class="panel-heading">
				<h4 class="panel-title">Categorias <span class="label label-success m-l-5 t-minus-1">NEW</span></h4>
				<div class="panel-heading-btn">
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-warning" data-click="panel-collapse"><i class="fa fa-minus"></i></a>
					<a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-danger" data-click="panel-remove"><i class="fa fa-times"></i></a>
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
								<th>#</th>
								<th>Nombre</th>
								<th width="1%"></th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="categoria in categorias" :key="categoria.id">
								<td class="with-img">
									<img :src="categoria.logo" class="img-rounded height-30" />
								</td>
								<td>{{categoria.nombre}}</td>
								
								<td class="with-btn" nowrap>
									<a href="#modal-editar" class="btn btn-sm btn-primary width-60 m-r-2" data-toggle="modal">Editar</a>
										<a href="#modal-eliminar" class="btn btn-sm btn-danger width-60" data-toggle="modal">Eliminar</a>
								</td>
							</tr>
							
							
						</tbody>
					</table>
				</div>
				<!-- end table-responsive -->
			</div>
			<!-- end panel-body -->
						
		</div>
					<!-- end panel -->
        <!-- #modal-dialog CREAR-->
		<div class="modal fade" id="modal-dialog">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Nueva Categoria</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Nombre</label>
								<div class="col-sm-9">
									<input class="form-control" type="text" placeholder="Ingrese el nombre"  />
								</div>
							</div>
							
							<div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Imagen</label>
								<div class="col-sm-9">
									<input type="file" class="form-control" placeholder="Seleccione una imagen" />
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Cerrar</a>
						<a href="javascript:;" class="btn btn-success">Guardar</a>
					</div>
				</div>
			</div>
		</div>
        <!-- #modal-dialog EDITAR-->
        <div class="modal fade" id="modal-editar">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Editar Categoria</h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Nombre</label>
								<div class="col-sm-9">
									<input class="form-control" type="text" placeholder="Ingrese el nombre"  />
								</div>
							</div>
							
							<div class="form-group row m-b-15">
								<label class="col-sm-3 col-form-label">Imagen</label>
								<div class="col-sm-9">
									<input type="file" class="form-control" placeholder="Seleccione una imagen" />
								</div>
							</div>
						</form>
					</div>
					<div class="modal-footer">
						<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Cerrar</a>
						<a href="javascript:;" class="btn btn-success">Guardar</a>
					</div>
				</div>
			</div>
		</div>

        <!-- #modal-alert ELIMINAR-->
		<div class="modal fade" id="modal-eliminar">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Alerta </h4>
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
					</div>
					<div class="modal-body">
						<div class="alert alert-danger m-b-0">
		    				<h5><i class="fa fa-info-circle"></i> Alerta Delete</h5>
							<p>Esta seguro que desea eliminar esta categoria?</p>
						</div>
					</div>
					<div class="modal-footer">
						<a href="javascript:;" class="btn btn-white" data-dismiss="modal">Cancelar</a>
						<a href="javascript:;" class="btn btn-danger" data-dismiss="modal">Eliminar</a>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>