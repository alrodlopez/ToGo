<template>
    <div class="pt-1">
        <div class="row align-items-center">
            <div class="col-sm-6">
                <div class="page-title-box">
                    <h4 class="font-size-18">{{ titulo }}</h4>
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item">
                            <router-link :to="{path: '/dashboard'}">
                                <span>Inicio</span>
                            </router-link>
                        </li>
                        <li class="breadcrumb-item">{{ menu }}</li>
                    </ol>
                </div>
            </div>
            
            <div class="col-sm-6">
                <div class="float-right d-none d-md-block">
                    <button class="btn btn-primary" @click="onClick()">
                        <i :class="icono"></i>
                        <span>{{ boton }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'Breacumbs',
    props: ['titulo', 'menu', 'ruta','boton', 'icono', 'nombre'],
    data () {
        return {
            
        }
    },
    methods: {
        ...mapMutations('restaurantes', ['setRestaurante']),
        onClick(){
            this.setRestaurante(null)
            this.$router.push({ path: this.ruta })
        },
        buscar(){
            
        },

    },
}
</script>
