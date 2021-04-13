<template>
  <q-page>
    <div class="column">
      <div class="col-auto shadow-3" style="margin-bottom: -80px; height: 170px;">
        <q-card flat class="bg-primary" >

            <q-img src="../static/images/portada.jpg" style="height:170px"/>

        </q-card>
      </div>
    </div>
    <div class="q-ma-sm text-center">
      <div class="row q-gutter-xs q-mb-xs">
        <div class="col">
          <q-avatar rounded  size="120px" class="q-mb-sm shadow-3">
            <img class="bg-white q-pa-xs text-center "  src="../static/images/logo.png">
          </q-avatar>
          <q-item-label class="text-center text-h6">{{ currentUser.nombre }} {{ currentUser.apellidos }}</q-item-label>
          <q-item-label caption class="text-center text-h6">Repartidor</q-item-label>
        </div>
      </div>
      <div class="col text-left q-mt-xl q-pa-sm">
        <q-item-label caption class="q-mb-sm text'h6">INFORMACION</q-item-label>
        <q-separator></q-separator>
        <div class="col text-left q-pa-sm">
          <q-item-section>
            <q-item-label caption class="q-mb-sm">Email</q-item-label>
            <q-item-label  class="q-mb-sm">{{ currentUser.email }}</q-item-label>
          </q-item-section>
        </div>
        <div class="col text-left q-pa-sm">
          <q-item-section>
            <q-item-label caption class="q-mb-xs">Teléfono</q-item-label>
            <q-item-label  class="q-mb-sm">{{ currentUser.telefono }}</q-item-label>
          </q-item-section>
        </div>
        <div class="col text-left q-pa-sm">
          <q-item-section>
            <q-item-label caption class="q-mb-xs">Nit</q-item-label>
            <q-item-label  class="q-mb-xs">{{ currentUser.repartidor.nit }}</q-item-label>
          </q-item-section>
        </div>
        <div class="col text-left q-pa-sm">
          <q-item-section>
            <q-item-label caption class="q-mb-xs">Ruat</q-item-label>
            <q-item-label  class="q-mb-xs">{{ currentUser.repartidor.ruat }}</q-item-label>
          </q-item-section>
        </div>
        <q-separator></q-separator>
        <div class="col q-pa-lg">
          <q-btn class="full-width bg-primary text-white" @click="modal = true" icon="lock" label="Cambiar Contraseña"/>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="modal"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card >
        <q-bar class="bg-primary">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
        <q-card-section class="q-mt-lg">
          <div class="text-h6">Cambiar Contrasena</div>
        </q-card-section>

        <q-card-section class="q-pt-none q-mt-lg">
          <div class="q-gutter-md col items-start">
            <q-input v-model="payload.current_password" stack-label label="Contrasena actual" :type="isPwd ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-input v-model="payload.password" stack-label label="Nueva Contrasena" :type="isPwda ? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwda ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwda = !isPwda"
                />
              </template>
            </q-input>
            <q-input v-model="payload.confirm_password" stack-label label="Confirmar Contrasena" :type="isPwdb? 'password' : 'text'">
              <template v-slot:append>
                <q-icon
                  :name="isPwdb ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwdb = !isPwdb"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right" >
          <q-btn rounded flat label="Cambiar" @click="cambiarPassword()" class="bg-white text-positive" />
          <q-btn rounded flat label="Cancelar" v-close-popup class="bg-white text-negative" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data(){
    return {
      isPwd: true,
      maximizedToggle: true,
      modal:false,
      isPwd: true,
      isPwda: true,
      isPwdb: true,
      payload: {
        current_password: '',
        password: '',
        confirm_password: ''
      },
    }
  },
  computed: {
    ...mapGetters('authModule', ['currentUser']),
  },
  methods: {
    ...mapActions('authModule', ['changePassword']),
    cambiarPassword(){
      this.changePassword(this.payload).then( response => {
        this.$q.notify({
          type: 'positive',
          html: true,
          position: 'top-right',
          multiLine: true,
          message: 'La contrasenia se cambio correctamente'
        })
        this.modal = false
      }).catch( error => {
        console.log(error)
      })
    },

  },
}
</script>
