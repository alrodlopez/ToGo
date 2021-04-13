<template>
    <div>

        <div id="sidebar" class="sidebar">
            <div data-scrollbar="true" data-height="100%">
                <ul class="nav">
                    <li class="nav-profile">
                        <a href="javascript:;" data-toggle="nav-profile">
                            <div class="cover with-shadow"></div>
                            <div class="image">
                                <img src="static/assets/img/user/user-15.jpg" alt />
                            </div>
                            <div class="info">
                                {{ user.nombre }} {{ user.apellidos }}
                            </div>
                        </a>
                    </li>
                </ul>
                <ul class="nav">
                    <li class="nav-header">Menu</li>
                    <li>
                        <router-link :to="{name: 'escritorio'}">
                            <i class="fa fa-th-large"></i>
                            <span>Escritorio</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/productos">
                            <i class="fa fa-cubes"></i>
                            <span>Productos</span>
                        </router-link>
                    </li>
                    <li v-if="rol != 'Empleado1' && rol != 'Empleado2'">
                        <router-link to="/repartidores">
                            <i class="fa fa-motorcycle"></i>
                            <span>Repartidores</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/pedidos">
                            <i class="fa fa-utensils"></i>
                            <span>Pedidos <span class="badge badge-succes badge-pill">{{this.filtroPedidos().length}}</span></span>
                        </router-link>
                    </li>
                    <li class="has-sub" v-if="rol != 'Empleado1' && rol != 'Empleado2'">
                        <a href="javascript:;">
                            <b class="caret"></b>
                            <i class="fa fa-cogs"></i>
                            <span>Configuraciones</span>
                        </a>
                        <ul class="sub-menu">
                            <li><router-link to="/restaurantes">Restaurante</router-link></li>
                            <li><router-link to="/usuarios">Empleados</router-link></li>
                            <li><router-link to="/tipos">Categorias Productos</router-link></li>
                        </ul>
                    </li>
                    <li class="has-sub" v-if="rol != 'Empleado2'">
                        <span>
                    <a-switch checked-children="OPEN" un-checked-children="CLOSED" :checked="this.valor"  @change="cambio(valor)">
                    <a-icon slot="checkedChildren" type="check" />
                    <a-icon slot="unCheckedChildren" type="close" />
                    </a-switch> 
                    </span>                 
                    </li>
                    <li><a href="javascript:;" class="sidebar-minify-btn" data-click="sidebar-minify"><i class="fa fa-angle-double-left"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import * as utils from '../../utils/utils'
export default {
    name: "SideBar",
    data(){
        return {
            rol: '',
            valor: ''        
        }
    },
    computed: {
        ...mapGetters('auth', ['user']),
        ...mapGetters('restaurante',['restaurant']),
        ...mapGetters('pedidos', ['pedidos']),
    },
    methods: {
        ...mapActions('restaurante',['getRestaurante','cambiarEstado']),
        ...mapActions('pedidos', ['getPedidos']),
        rolex(){
            this.rol = this.user.rol[0].nombre
        },
        estado(){
            if(this.restaurant.estado == 0)
            this.valor = false
            else
            this.valor = true
        },
        cambio(val){
            if(val == false){
                this.valor = true
                let payload = {id: this.restaurant.id, estado: 1}
                this.cambiarEstado(payload).then(response =>{
                    this.$swal.fire('Exito!', 'Se abrio el establecimiento.', 'success');
                })
            }
            else{
                this.valor = false
                let payload = {id: this.restaurant.id, estado: 0}
                this.cambiarEstado(payload).then(response =>{
                    this.$swal.fire('Exito!', 'Se cerro el establecimiento.', 'success');
                })
            }

        },
        filtroPedidos()
        {
            return this.pedidos.filter(pedido => pedido.entrega === null);
        },
        listen(){
         window.Echo.connector.pusher.config.authEndpoint = `http://localhost:8000/api/broadcasting/auth`;
         window.Echo.private('pedido.'+this.user.restaurante)
         .listen('NuevoPedido', (data) =>{
             this.getPedidos(this.user.restaurante)
             this.sonido();
             utils.notificacion("Hay un pedido nuevo!","success")
        });
        },
        sonido(){
            var audio = new Audio('static/assets/sound/notificaction.mp3');
            audio.setAttribute("preload", "auto");
            audio.setAttribute("allow", "autoplay");
            audio.play(); 
        }

    },
    mounted() {
        
        setTimeout(this.estado,2000);
        this.getRestaurante(this.user.restaurante)
        this.listen();
        this.getPedidos(this.user.restaurante)
        this.rolex()
    }
}
</script>
