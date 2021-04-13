<template>
    <div>
        <div class="row">
            <div class="col-xl-3 col-md-3">
                <div class="widget widget-stats bg-red">
                    <div class="stats-icon"><i class="fa fa-cart-plus"></i></div>
                    <div class="stats-info">
                        <h4>PRODUCTOS MAS VENDIDOS</h4>
                        <p>&nbsp;</p>
                    </div>
                    <div class="stats-link">
                        <a href="javascript:;" @click.prevent="show=true">Ver Detalle <i class="fa fa-arrow-alt-circle-right"></i></a>
					</div>
                </div>
			</div>
            <div class="col-xl-3 col-md-3">
                <div class="widget widget-stats bg-blue">
                    <div class="stats-icon"><i class="fa fa-desktop"></i></div>
                    <div class="stats-info">
                        <h4>PEDIDOS PENDIENTES</h4>
                        <p>{{filtarPorEstadoEntrega().length}}</p>
                    </div>
                    <router-link to="/pedidos">
                    <div class="stats-link">
						<a href="javascript:;">Ver Detalle <i class="fa fa-arrow-alt-circle-right"></i></a>
					</div>
                    </router-link>
                </div>
			</div>
            <div class="col-xl-3 col-md-3">
                <div class="widget widget-stats bg-info">
                    <div class="stats-icon"><i class="fa fa-check"></i></div>
                    <div class="stats-info">
                        <h4>PEDIDOS ENTREGADOS</h4>
                        <p>{{filtarPorEstadoEntregaEntregado().length}}</p>
                    </div>
                    <router-link to="/pedidos">
                    <div class="stats-link">
						<a href="javascript:;">Ver Detalle <i class="fa fa-arrow-alt-circle-right"></i></a>
					</div>
                    </router-link>
                </div>
			</div>
            <div class="col-xl-3 col-md-3">
                <div class="widget widget-stats bg-orange">
                    <div class="stats-icon"><i class="fa fa-motorcycle"></i></div>
                    <div class="stats-info">
                        <h4>REPARTIDORES DISPONIBLES</h4>
                        <p>{{filtarPorEstado().length}}</p>
                    </div>
                    <router-link to="/repartidores">
                    <div class="stats-link">
						<a href="javascript:;">Ver Detalle <i class="fa fa-arrow-alt-circle-right"></i></a>
					</div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="row vld-parent">
            <loading :active.sync="isLoading"
            :can-cancel="false"
            :on-cancel="onCancel"
            :is-full-page="false"></loading>
            <div class="col-xl-7">
                <div class="panel panel-inverse" data-sortable-id="index-1">
                    <div class="panel-heading">
                        <h4 class="panel-title">Ultimos Pedidos Registrados</h4>
                        <div class="panel-heading-btn">
                            <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                            <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        </div>
                    </div>
                    <div class="panel-body pr-1">
                        <div class="table-responsive">
                            <table class="table table-striped m-b-0">
                                <thead>
                                    <tr>
                                        <th>N°</th>
                                        <th>Cliente</th>
                                        <th>Fecha</th>
                                        <th width="1%"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(pedido, index) in pedidos" :key="index.id">
                                        <td>
                                            {{index+1}}
                                        </td>
                                        <td>{{pedido.cliente.nombre}} {{pedido.cliente.apellidos}}</td>
                                        <td>{{pedido.orden.fecha}}</td>
                                        <td class="with-btn" nowrap>
                                            <a href="#" class="btn btn-sm btn-primary width-60 m-r-2" @click.prevent="mostrarDetalle(pedido)">Detalle</a>

                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-5">
                <div class="panel panel-inverse" data-sortable-id="index-6">
                    <div class="panel-heading">
                        <h4 class="panel-title">Detalles del pedido</h4>
                        <div class="panel-heading-btn">
                            <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-default" data-click="panel-expand"><i class="fa fa-expand"></i></a>
                            <a href="javascript:;" class="btn btn-xs btn-icon btn-circle btn-success" data-click="panel-reload"><i class="fa fa-redo"></i></a>
                        </div>
                    </div>
                    <div class="panel-body">
                        <div class="alert alert-success fade show" v-if="detalles.length==0">
                            <strong>Seleccione un pedido para ver su detalle</strong>
                        </div>
                        <div class="table-responsive" v-else>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">N°</th>
                                        <th scope="col">Producto</th>
                                        <th scope="col">Cantidad</th>
                                        <th scope="col">Precio (Bs.)</th>
                                        <th scope="col">SubTotal (Bs.)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(detalle, index) in detalles" :key="index">
                                        <th scope="row">{{index+1}}</th>
                                        <td>{{detalle.nombre}}</td>
                                        <td>{{detalle.pivot.cantidad}}</td>
                                        <td>{{detalle.precio}}</td>
                                        <td>{{detalle.precio * detalle.pivot.cantidad }}</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4"><b>Total a Pagar:</b></td>
                                        <td><b>{{total}} Bs.</b></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a-modal
            :width="600"
            :visible="show"
            :destroyOnClose="true"
            :maskClosable="false"
            :centered="false"
            @cancel="show=false"
            :header="null"
            :footer="null"
        >
        <div class="body">
            <mas-vendidos :productos="masVendidos"></mas-vendidos>
        </div>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import mas_vendidos from './productos/mas_vendidos'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  name: 'IndexView',
  data(){
	  return{
          estado:'',
          show: false,
          id_pedido: '',
          isLoading: false,
          fullPage: true,
		  detalles: [],
		  pedido: [],
		  pedido:{
			  cliente_id: '',
			  ubicacion_id: '',
			  fecha: '',
		  },
		  entrega:{

		  }
	  }
  },
  components:{
      Loading,
      'mas-vendidos':mas_vendidos
  },
  computed: {
	  	...mapGetters('repartidores', ['repartidores']),
		  ...mapGetters('pedidos', ['pedidos']),
          ...mapGetters('entregas', ['entregas']),
          ...mapGetters('productos',['masVendidos']),
          ...mapGetters('auth', ['user']),

          total() {
            return this.detalles.reduce((total, item) => {
                return total + item.pivot.cantidad * item.precio;
            }, 0)
        }
  },
  methods: {
	  	...mapActions('repartidores', ['getRepartidores']),
		  ...mapActions('pedidos', ['getPedidos']),
          ...mapActions('entregas', ['getEntregas']),
          ...mapActions('productos',['getMasVendidos']),
	  	filtarPorEstado(){

                return this.repartidores.filter(repartidor => repartidor.estado === 'Libre');

		},
		filtarPorEstadoEntrega(){

                return this.entregas.filter(entrega => entrega.estado_entrega === 'PENDIENTE');

		},
		filtarPorEstadoEntregaEntregado(){

                return this.entregas.filter(entrega => entrega.estado_entrega === 'ENTREGADO');

		},
		mostrarDetalle(pedido){
			this.detalles = pedido.detalle
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
  mounted() {
		this.getRepartidores()
		this.getPedidos(this.user.restaurante)
        this.getEntregas()
        this.doAjax()
        this.getMasVendidos()

    }
}
</script>
<style>
</style>
