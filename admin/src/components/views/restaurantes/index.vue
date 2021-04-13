<template>
    <div>
        
        <breacumbs-component
            titulo="Lista de Restaurantes registrados"
            menu="Restaurantes"
            ruta="/registrar"
            boton="Registrar Restaurante"
            icono="fas fa-plus"
        />
        <div class="row">
            <div class="col-xl-6">
                <div class="float-left d-md-block">
                    <div class="input-group">
                    <input type="text"
                    v-model="nombre"
                    placeholder="Buscar restaurante..."
                    class="form-control">
                    <button class="btn btn-secondary" type="submit">
                        <i class="fa fa-search"></i>
                    </button> 
                    </div>
                </div>   
                
            </div>
        </div><br>
        <div class="row">
            <loading
                :active.sync="isLoading"
                :can-cancel="false"
                :is-full-page="true"
            >
            </loading>
            
            <paginate
            name="restaurantesFilter" :list="restaurantesFilter" :per="6"
            class="container"
            >
            <div class="col-xl-6 col-md-6 float-left d-md-block" v-for="(item, index) in paginated('restaurantesFilter')" :key="item.restaurante_id ">
                <CardRestaurant :restaurante="item"></CardRestaurant>  
            </div>
            </paginate>
            
            <paginate-links for="restaurantesFilter" :show-step-links="true"></paginate-links>
            <span v-if="restaurantesFilter.length == 0" class="badge badge-danger">Sin resultados!</span>
        </div>
        
        
    </div>
</template>
<script>
import Vue from 'vue'
// :style="{'color': 'white','background-color':'#'+(Math.random()*0xFFFFFF<<0.7).toString(16)} "
import { mapActions, mapGetters } from 'vuex';
import Breacumbs from '../../elements/Breacumbs';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import CardRestaurant from '../restaurantes/card_restaurant';
import VuePaginate from 'vue-paginate'
Vue.use(VuePaginate)
export default {
    name: 'RestaurantesView',
    data() {
        return {
            showNew: false,
            showEdit: false,
            isLoading: false,
            nombre:'',
            paginate: ['restaurantesFilter']
        }
        
    },
    components: {
        'breacumbs-component': Breacumbs,
        CardRestaurant,
        Loading,
    },
    computed: {
        ...mapGetters('restaurantes', ['restaurantes']),
        restaurantesFilter: function() {
            var textSearch = this.nombre;
            return this.restaurantes.filter(function(el){
                return el.nombre.toLowerCase().indexOf(textSearch.toLowerCase()) !== -1;
            });
        }
    },
    methods: {
        ...mapActions('restaurantes', ['getRestaurantes']),
        loading() {
            this.isLoading = true;
            // simulate AJAX
            setTimeout(() => {
                this.isLoading = false
            },5000)
        },
        setPage: function(page){
            this.page = page;
        }
    },
    mounted() {
        //this.loading();
        this.getRestaurantes();
    },
}
</script>
<style>
  .paginate-links{
    width:100%;
    list-style: none;
    text-align: center;
}
.paginate-links li {
      
    display: inline;
    background-color:#343a40;
    color:#ffc612;
    padding:0.5rem;
    margin-left:0.3rem;
    margin-right: 0.3rem;
    cursor:pointer;
    border-radius: 3px;
}
.paginate-links li.active a{
font-weight: bold;
}
.paginate-result{
    width: 100%;
    text-align:center;
    margin-bottom: 1rem;
}
.paginate-links a {
  color: #fff;
}
</style>