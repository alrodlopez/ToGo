<template>
    <div>
        <!-- begin panel -->
		<div class="panel panel-inverse" data-sortable-id="table-basic-7">
			<!-- begin panel-heading -->
			<div class="panel-heading">
				<h4 class="panel-title">Pedidos <span class="label label-success m-l-5 t-minus-1">NEW</span></h4>
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
								<th>Cliente</th>
								<th>Producto</th>
                                <th>Cantidad</th>
                                <th>Detalle</th>
								<th width="1%"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>Nicky Almera</td>
								<td>Alitas Picantes</td>
                                <td>2</td>
								<td class="with-btn" nowrap>
									<a href="#" class="btn btn-sm btn-primary width-60 m-r-2">Designar</a>
										<a href="#" class="btn btn-sm btn-white width-60">Estado</a>
								</td>
							</tr>
							<tr>
								<td class="with-img">
									<img src="/../../../static/assets/img/user/user-2.jpg" class="img-rounded height-30" />
								</td>
								<td>Edmund Wong</td>
								<td>edmund@yahoo.com</td>
								<td class="with-btn-group" nowrap>
									<div class="btn-group">
										<a href="#" class="btn btn-white btn-sm width-90">Settings</a>
										<a href="#" class="btn btn-white btn-sm dropdown-toggle width-30 no-caret" data-toggle="dropdown">
										<span class="caret"></span>
										</a>
										<div class="dropdown-menu dropdown-menu-right">
											<a href="#" class="dropdown-item">Action 1</a>
											<a href="#" class="dropdown-item">Action 2</a>
											<a href="#" class="dropdown-item">Action 3</a>
											<div class="dropdown-divider"></div>
												<a href="#" class="dropdown-item">Action 4</a>
										</div>
									</div>
								</td>
							</tr>
							<tr>
								<td class="with-img">
									<img src="/../../../static/assets/img/user/user-3.jpg" class="img-rounded height-30" />
								</td>
								<td>Harvinder Singh</td>
								<td>harvinder@gmail.com</td>
								<td class="with-btn" nowrap>
									<a href="#" class="btn btn-sm btn-primary width-60 m-r-2">Edit</a>
									<a href="#" class="btn btn-sm btn-white width-60">Delete</a>
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
    </div>
</template>