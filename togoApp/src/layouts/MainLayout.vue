<template>
  <!-- hHh LpR fFf -->
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="menu" class="q-mr-sm" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-avatar>
          <q-img src="../static/images/logo.png"/>
        </q-avatar>
        <q-toolbar-title>ToGo</q-toolbar-title>
      </q-toolbar>
      <q-tabs
        align="justify"
        class="bg-primary text-white "

      >
        <q-route-tab
          icon="moped"
          to="/inicio"
          label="Entregas"
          no-caps
          exact
        >
          <!-- <q-badge color="negative" floating>2</q-badge> -->
        </q-route-tab>
        <q-route-tab
          icon="restore"
          to="/historial"
          label="Historial"
          no-caps
          exact
        >
          <!-- <q-badge color="positive" floating>2</q-badge> -->
        </q-route-tab>
        <q-route-tab
          icon="person"
          to="/perfil"
          label="Perfil"
          no-caps
          exact
        />
      </q-tabs>
    </q-header>
    <q-drawer
      elevated
      v-model="leftDrawerOpen"
      content-class="bg-secondary text-accent"
      color="white"
      :width="240"
    >
        <q-img
          class="absolute-top bg-primary"
          src="../static/images/portada.jpg"
          style="height: 228px"
        >
        <div class="absolute-bottom bg-dark3 text-white">
          <div class="row q-col-gutter-xs" >
            <div class="col-12">
              <q-item-label class="text-weight-bold">{{ currentUser.nombre }} {{ currentUser.apellidos}} </q-item-label>
              <q-item-label>{{ currentUser.email }}</q-item-label>
            </div>
          </div>
        </div>
      </q-img>
      <q-scroll-area class="scroll">
        <q-list>
          <q-item>
            <q-toggle left-label :label="`Moto driver ${driver}`" v-model="value" @input="cambio(value)">
              <q-popup-proxy v-if="error != ''">
                <q-banner>
                  <template v-slot:avatar>
                  <q-icon name="gps_off" color="primary" />
                  </template>
                    Activa el GPS de tu dispositivo
                </q-banner>
              </q-popup-proxy>
            </q-toggle>
          </q-item>
          <q-separator></q-separator>
          <q-item to="/" v-ripple clickable>
            <q-item-section avatar style="min-width: 0px;">
              <q-icon name="restaurant" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Pedidos pendientes</q-item-label>

            </q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/historial">
            <q-item-section avatar style="min-width: 0px;">
              <q-icon name="hourglass_full" />
            </q-item-section>
            <q-item-section>
              <q-item-label >Historial de pedidos</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/perfil" v-ripple clickable>
            <q-item-section avatar style="min-width: 0px;">
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Perfil</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item v-ripple clickable>
            <q-item-section avatar style="min-width: 0px;">
              <q-icon name="lock" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Cambiar contrasena</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item v-ripple clickable>
            <q-item-section avatar style="min-width: 0px;">
              <q-icon name="power_settings_new" />
            </q-item-section>
            <q-item-section @click="salir()">
              <q-item-label>Cerrar Sesión</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutRight" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins
export default {
  name: 'MainLayout',

  data () {
    return {
      leftDrawerOpen: false,
      driver: 'OFF',
      value: false,
      error: '',
    }
  },
  computed: {
    ...mapGetters('authModule', ['currentUser'])
  },
  methods: {
    ...mapActions('authModule', ['logout']),
    ...mapActions('repartidor', ['cambiarEstado']),
    cerrarSesion(){
      this.logout().then( response => {
        //console.log(response)
        this.$router.push({ name: 'Login'});
        this.$store.commit('togo/setDriver', `OFF`)
      }).catch( error => {
        console.log(error)
      })
    },
    cambio(valor){
      if(valor == true){
        Geolocation.getCurrentPosition().then( position => {
          this.error = '';
          this.value = true
          this.driver = 'ON'
          this.$store.commit('togo/setDriver', `ON`)
          let ubicacion = { latitude: position.coords.latitude, longitude: position.coords.longitude }
          this.$store.commit('togo/setUbicacion', ubicacion)
          //metodo para cambiar el estado activo y enviar ubicacion del repartidor
          let payload = { idRepartidor: this.currentUser.repartidor.id, estado: 1, ubicacion: ubicacion}
          this.cambiarEstado(payload)
        }).catch( error => {
          this.$store.commit('togo/setDriver', `OFF`)
          this.error = error;
          this.value = false
          this.driver = 'OFF'
        });
      }
      else{
        this.driver = 'OFF'
        this.$store.commit('togo/setDriver', `OFF`)
        let ubicacion = { latitude: '-65', longitude: '-17' }
        let payload = { idRepartidor: this.currentUser.repartidor.id, estado: 0, ubicacion: ubicacion }
        this.cambiarEstado(payload)
        console.log('no')
      }

    },
    salir () {
      this.$q.dialog({
        dark:false,
        html: true,
        title: 'Confirmar',
        message: '¿Esta seguro de cerrar su sesión?',
        ok: { push: true, color: 'positive', icon: 'check', size: 'sm', rounded: true },
        cancel: { push: true, icon: 'cancel', size: 'sm', color: 'negative', rounded: true },
        persistent: true,
      }).onOk(() => {
        //console.log('ok')
        this.cerrarSesion()
      })
    }
  },
}
</script>
<style scoped>
.logout {
  position: absolute;
  top: -150px;
  right: 10px;
}

.scroll {
  height: calc(100% - 230px);
  margin-top: 230px;
  border-right: 0px solid #ddd;
}
.caption{
  color: #384152;
}
.q-tab--full {
    min-height: 0px;
}
</style>
