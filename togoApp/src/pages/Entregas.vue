<template>
  <q-page class="q-pt-xs">
    <div class="column full-height q-pl-xs q-pr-xs">
      <div class="col-auto" style="margin-bottom: 8px; height: 100px;">
        <q-card flat class="bg-primary full-height q-mt-sm" style="margin-top: -8px; border-radius: 0px 0px 15px 15px">
          <q-card-section class="text-white">
              <div class="row q-pt-md">
                <div class="col-1" style="width: 27px;">
                  <q-icon name="moped" style="font-size: 25px; margin: 0px;"/>
                </div>
                <div class="col">
                  <q-item-label no-caps class="text-white text-h6">Entregas</q-item-label>
                </div>
              </div>
            <q-item-label caption class="text-white">Lista de pedidos pendientes</q-item-label>
            <q-item-label class="text-center text-white" caption></q-item-label>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-if="filtrar().length == 0 || driverStatus == 'OFF'" class="column text-center">
      <pre></pre>
      <div class="col-2">&nbsp;</div>
      <div class="col-8">
        <q-img
          src="../static/images/pendientes.png"
          sizes="(max-width: 400px) 400w,
              (min-width: 400px) and (max-width: 800px) 800w,
              (min-width: 800px) and (max-width: 1200px) 1200w,
              (min-width: 1200px) 1600w"
          style="height: 280px; max-width: 300px"
        />
      </div>
      <div class="col-2">&nbsp;</div>
    </div>
    <div v-if="pedidosRepartidor.length > 0 && driverStatus == 'ON'">
      <q-list class="q-ml-xs q-mr-xs" style="border-color: yellow">
        <q-item class="borde  q-mb-xs bg-grey-3" v-for="(item, index) in filtrar()" :key="index">
          <q-item-section avatar>
            <q-avatar rounded size="38px">
              <img src="../static/images/portada.jpg">
              <q-badge floating color="negative">P</q-badge>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-subtitle1 text-primary">{{ item.pedido.cliente.nombre }}</q-item-label>
            <q-item-label caption lines="2"><span class="text-accent text-weight-bold">Direccion: </span>{{ item.pedido.orden.direccion }}</q-item-label>
            <q-item-label caption lines="2"><span class="text-accent text-weight-bold">Telefono: </span>{{ item.pedido.cliente.telefono }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label>{{ item.pedido.orden.total }} Bs. </q-item-label>
            <q-btn size="xs" color="primary" label="ver" @click.prevent="verDetalle(item.pedido.orden.pedido_id)" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EntregasPage',
  computed: {
    ...mapGetters('authModule', ['currentUser']),
    ...mapGetters('pedidos', ['pedidosRepartidor']),
    ...mapGetters('togo', ['driverStatus', 'miUbicacion'])

  },
  methods: {
    ...mapActions('pedidos', ['getPedidosRepartidor']),
    verDetalle(_id){
      this.$router.push({ name: 'Detalle', params: { id: _id}})
    },
    filtrar(){
      return this.pedidosRepartidor.filter(pedido => pedido.estado_entrega == 'PENDIENTE');
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
