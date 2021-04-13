<template>
  <q-page class="flex flex-center">
    <q-toggle left-label :label="`Moto driver ${driver}`" v-model="value" @input="cambio(value)">
      <q-popup-proxy v-if="error != ''">
        <q-banner>
          <template v-slot:avatar>
           <q-icon name="gps_off" color="primary" />
          </template>
            Activa la ubicacion de tu dispositivo
        </q-banner>
      </q-popup-proxy>
    </q-toggle>


  </q-page>
</template>

<script>
import { Plugins } from '@capacitor/core'

const { Geolocation, LocalNotifications } = Plugins

export default {
  name: 'PageIndex',
  data() {
    return {
      lat: '',
      lng: '',
      estado: '',
      position: 'determinig',
      value: false,
      error: '',
      driver: 'OFF'
    }

  },
  methods: {
    getCurrentPosition(){

        Geolocation.getCurrentPosition().then(position => {
          console.log('Current',position);
          this.error = '';
          this.value = true
          this.driver = 'ON'
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          this.position = position;

        }).catch( error => {
          console.log(error)
          this.error = error;
          this.value = false
          this.driver = 'OFF'
        });

    },
    obtenerUbicacion(){

        console.log('prueba')

    },
    cambio(valor){
        if(valor == true){
          this.getCurrentPosition();
        console.log('si')
        }
        else{
          this.driver = 'OFF'
          console.log('no')
        }


    }


    },

  async mounted(){
    const notifs = await LocalNotifications.schedule({
    notifications: [
      {
        title: "Title",
        body: "Body",
        id: 1,
        schedule: { at: new Date(Date.now() + 1000 * 5) },
        sound: null,
        attachments: null,
        actionTypeId: "",
        extra: null
      }
    ]
  }

}


</script>
