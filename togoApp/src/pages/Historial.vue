<template>
  <q-page class="q-pt-xs">
    <!-- <q-select class="q-ma-xs" rounded outlined  vlabel="Label"  maxlength="12" :dense="true">
      <template v-slot:append>
        <q-icon name="search" @click.stop />
      </template>
    </q-select> -->
    <!-- <pre>{{ pedidosRepartidor }}</pre> -->
    <div class="column full-height q-pl-xs q-pr-xs">
      <div class="col-auto" style="margin-bottom: 8px; height: 100px;">
        <q-card flat class="bg-primary full-height q-mt-sm" style="margin-top: -8px; border-radius: 0px 0px 15px 15px">
          <q-card-section class="text-white">
              <div class="row q-pt-md">
                <div class="col-1" style="width: 27px;">
                  <q-icon name="restore" style="font-size: 25px; margin: 0px;"/>
                </div>
                <div class="col">
                  <q-item-label no-caps class="text-white text-h6">Historial</q-item-label>
                </div>
              </div>
            <q-item-label caption class="text-white">Lista de Pedidos entregados</q-item-label>
            <q-item-label class="text-center text-white" caption></q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="filtrar().length == 0" class="column text-center">
      <div class="col-2">&nbsp;</div>
      <div class="col-8">
        <q-img src="../static/images/historial.png" :ratio="1" style="width:80%;height:60%;"/>
      </div>
      <div class="col-2">&nbsp;</div>
    </div>
    <div v-if="pedidosRepartidor.length > 0">
      <q-list class="q-ml-xs q-mr-xs" style="border-color: yellow">
        <q-item class="borde  q-mb-xs bg-grey-3" v-for="(item, index) in filtrar()" :key="index">
          <q-item-section avatar>
            <q-avatar rounded size="38px">
              <img src="../static/images/portada.jpg">
              <q-badge floating color="positive">E</q-badge>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-primary">{{ item.pedido.cliente.nombre }}</q-item-label>
            <q-item-label caption lines="2"><span class="text-accent text-weight-bold">Direccion: </span>{{ item.pedido.orden.direccion }}</q-item-label>
            <q-item-label caption lines="2"><span class="text-accent text-weight-bold">Telefono: </span>{{ item.pedido.cliente.telefono }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'HistorialPage',
  computed: {
    ...mapGetters('authModule', ['currentUser']),
    ...mapGetters('pedidos', ['pedidosRepartidor'])
  },
  methods: {
    ...mapActions('pedidos', ['getPedidosRepartidor']),
    verDetalle(_id){
      this.$router.push({ name: 'Detalle', params: { id: _id}})
    },
    filtrar(){
      return this.pedidosRepartidor.filter(pedido => pedido.estado_entrega == 'ENTREGADO');
    }
  },
  mounted() {
    this.getPedidosRepartidor(this.currentUser.repartidor.id)
  },
}
</script>
<style scoped>
.my-card{
  width: 100%;
}
.borde {
  border-radius: 5px;
}
</style>
