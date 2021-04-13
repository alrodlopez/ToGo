<template>
    <div>
        <div class="card directory-card">
            <div class="card-body">
                <div class="media">
                    <img :src="restaurante.logo" alt="" class="img-fluid img-thumbnail rounded-circle avatar-lg">
                    <div class="media-body ml-3">
                        <h5 class="text-primary font-size-18 mt-0 mb-1">{{ restaurante.nombre }}</h5>
                        <p class="font-size-12 mb-0"><span><i class="fa fa-home"></i> </span> {{ restaurante.direccion }}</p>
                        <p class="font-size-12 mb-0"><span><i class="fa fa-phone"></i> </span> {{ restaurante.telefono }}</p>
                        <p class="mb-0"><span><i class="fa fa-envelope"></i> </span> {{ restaurante.email }}</p>
                    </div>
                    <ul class="list-unstyled social-links float-right">
                        <li><a href="#" class="btn-primary" @click.prevent="editar(restaurante)"><i class="mdi mdi-pencil"></i></a></li>
                        <li><a href="#" class="btn-danger" @click.prevent="confirmar(restaurante)"><i class="mdi mdi-delete-alert"></i></a></li>
                    </ul>
                </div>
                <hr>
                <p class="mb-0"><b>Descripción : </b>{{ restaurante.descripcion }}</p>
                <hr>
                <p class="mb-0">
                    <span
                        v-for="(categoria, index) in restaurante.categorias"
                        :key="index"
                        class="badge badge-pill badge-dark mr-1 p-1"
                        style="font-size: 12px;"
                    >
                        {{ categoria.nombre }}
                    </span>

                    <span v-if="restaurante.categorias.length == 0" class="badge badge-danger">No pertenece a ninguna categoria</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex';
import * as utils from '../../../utils/utils';
export default {
    name: 'CardRestaurant',
    props: {
        restaurante: {
            type: Object,
            required: true,
        }
    },
    methods: {
        ...mapMutations('restaurantes', ['setRestaurante']),
        ...mapActions('restaurantes', ['deleteRestaurante']),
        editar(restaurante){
            this.setRestaurante(restaurante);
            this.$router.push({ path: '/registrar' })
        },
        confirmar(restaurante){
            this.$swal.fire({
                title: 'Esta seguro?',
                text: "Esta seguro de eliminar el restaurante: " + restaurante.nombre,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
            }).then((result) => {
                if (result.value) {
                    this.eliminar(restaurante);
                }
            });

        },
        eliminar(restaurante){
            this.deleteRestaurante(restaurante.id).then( () => {
                utils.alerta("Eliminado!", `El restaurante se elimino correctamente.`, "success");
            }).catch( error => {
                console.log(error);
            })
        },
    }
}
</script>
