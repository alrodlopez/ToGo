<template>
  <q-page>
    <detalle-pedido></detalle-pedido>
  </q-page>
</template>

<script>
import DetallePedido from 'components/DetallePedidoComponent'
export default {
  name: 'PedidosPendientesPage',
  components: {
    'detalle-pedido': DetallePedido
  }
}
</script>
