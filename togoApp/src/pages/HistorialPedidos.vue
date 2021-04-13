<template>
  <q-page padding>
    <!-- content -->
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>Fernando Lopez</q-item-label>
          <q-item-label caption lines="1">Fecha pedido: 01/07/2020</q-item-label>
          <q-item-label caption lines="2">Direccion: Bolivar 451 y 6 de Octubre</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Total: 50 Bs</q-item-label>
          <q-btn round color="amber" icon="info" @click="persistent = true"/>
          <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
            <q-card class="bg-amber text-white" style="width: 300px">
              <q-card-section>
                <div class="text-h6">Detalles Pedido</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Detalles...
              </q-card-section>

              <q-card-actions align="right" class="bg-white text-teal">
                <q-btn color="black" flat label="OK" v-close-popup />
              </q-card-actions>
            </q-card>
    </q-dialog>
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
      <q-item>
        <q-item-section>
          <q-item-label>Pamela Morales</q-item-label>
          <q-item-label caption lines="1">Fecha pedido: 01/07/2020</q-item-label>
          <q-item-label caption lines="2">Direccion: Velasco 41 y Sucre</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Total: 89 Bs</q-item-label>
          <q-icon name="info" color="yellow" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
      <q-item>
        <q-item-section>
          <q-item-label>Martin Rodriguez</q-item-label>
          <q-item-label caption lines="1">Fecha pedido: 01/07/2020</q-item-label>
          <q-item-label caption lines="2">Direccion: Brasil 585 y Junin</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Total: 145 Bs</q-item-label>
          <q-icon name="info" color="yellow" />
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
      <q-item>
        <q-item-section>
          <q-item-label>Mariela Gonzales</q-item-label>
          <q-item-label caption lines="1">Fecha pedido: 01/07/2020</q-item-label>
          <q-item-label caption lines="2">Direccion: Murguia 547 y 6 de Octubre</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>Total: 122 Bs</q-item-label>
          <q-icon name="info" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
export default {
  name: 'HistorialPedidos',
  data(){
    return{
      persistent: false
    }
  }
}
</script>
