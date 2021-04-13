<template>
    <div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-xl-12">
                <div class="panel-body">
                    <div class="row">
                        <div class="input-group mb-1 mr-2">
                            <input type="text" class="form-control input-white" placeholder="Ingrese palabras clave aquí...">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-info mr-1"><i class="fa fa-search fa-fw"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-b-10 f-s-10 m-t-10">
            <a href="#modal-widget-table" class="pull-right f-s-10 text-grey-darker m-r-3 f-w-700" data-toggle="modal"> Total: {{ filtrarRepartidor.length }}</a>
            <b class="text-inverse">LISTA DE REPARTIDORES DISPONIBLES</b>
        </div>
        <div class="table-responsive">
            <loading :active.sync="isLoading"
                    :can-cancel="false" 
                    :on-cancel="onCancel"
                    :is-full-page="false"></loading>
            <!-- begin widget-table -->
            <paginate
                ref="paginator"
                name="repartidores"
                :list="filtrarRepartidor"
                :per="perPage"
                style="padding: 0px;"
            >
                <table class="table table-bordered widget-table widget-table-rounded" data-id="widget">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th width="80%">Repartidor</th>
                            <th>Opcion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(repartidor, index) in paginated('repartidores')" :key="repartidor.id">
                            <td>{{ index + 1 }}</td>
                            <td>
                                <h4 class="widget-table-title">{{ repartidor.nombre }} {{ repartidor.apellidos }}</h4>
                                <p class="widget-table-desc m-b-15">Telefono: {{ repartidor.telefono }}</p>
                            </td>
                            <td>
                                <button @click.prevent="asignarPedido(repartidor.id)" class="btn btn-inverse btn-sm width-80 rounded-corner">Asignar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </paginate>
            <!-- end widget-table -->
        </div>
        <div class="row">
            <div class="col-lg-12 col-md-12 col-xl-12">
                <div class="panel-body">
                    <div class="pull-right">
                        <nav aria-label="Contacts Page Navigation">
                            <paginate-links
                                for="repartidores"
                                :show-step-links="true"
                                :step-links="{
                                    next: 'Siguiente',
                                    prev: 'Anterior'
                                }"
                                :classes="{
                                    'ul': 'pagination',
                                    '.prev > a': 'prev-link',
                                    'li': 'page-item',
                                    'li > a': 'page-link',
                                    '.next > a': 'next-link',
                                }"
                            >
                            </paginate-links>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: "Asiganar",
    data(){
        return{
            paginate: ['repartidores'],
            perPage: 5,
            isLoading: false,
            fullPage: true,
        }
    },
    props:{
        idPedido:{
            type:Number,
            required:true
        }
    },
    components: {
		Loading
	},
    computed:{
        ...mapGetters('repartidores', ['repartidores']),
        ...mapGetters('pedidos', ['pedidos']),
        ...mapGetters('auth',['user']),
        filtrarRepartidor(){
            return this.repartidores.filter(repartidor => repartidor.estado === 'Libre');
        },
    },
    methods: {
        ...mapActions('repartidores', ['getRepartidores', 'asignarRepartidor']),
        ...mapActions('entregas', ['asignarEntrega']),
        ...mapActions('pedidos', ['getPedidos']),

        asignarPedido(id){
            this.doAjax();
            let payload = { idPedido: this.idPedido, idRepartidor: id };
            this.asignarEntrega(payload).then( response =>{
                this.asignarRepartidor(id).then( () => {
                    this.$emit('closeModalAsignar', null);
                    this.getPedidos(this.user.restaurante);
                })
                //console.log('error cabia estado repartidor'. error)

            }).catch( error =>{
                console.log(error)
            })
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
        this.getRepartidores();
    }

}
</script>
