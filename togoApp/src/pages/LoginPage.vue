<template>

  <div class="index-page bg-grey-2 window-height window-width column items-center no-wrap">
    <div class="banner bg-primary flex flex-center">
      ToGo
    </div>
    <div class="card bg-white shadow-4 column no-wrap flex-center group" >
      <div class="text-center">
        <img src="../static/images/logo.png">
        <br>
        <q-card-section>
          <div class="text-h5">Iniciar Sesión</div>
          <div class="text-subtitle">Use sus credenciales para acceder.</div>
        </q-card-section>
      </div>
      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit.prevent="iniciarSesion()"
        >
          <q-input
            outlined
            v-model.trim="$v.form.email.$model"
            label="Email"
            stack-label
            counter
            maxlength="30"
            autocomplete="off"
          >
            <template v-slot:append>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model.trim="$v.form.password.$model"
            label="Password"
            type="password"
            autocomplete="off"
            stack-label
          >
            <template v-slot:append>
              <q-icon name="lock" />
            </template>
          </q-input><br>
          <div class="row">
              <q-btn size="md"  rounded color="primary" type="submit" label="Ingresar" class="full-width"/>
          </div>
          <div class="row"></div>
          <!-- <div class="row">
            <div class="col text-center">
              <span class="text-subtitle" style="font-size: 11px;">Desarrollado por Kaizen Code</span>
            </div>
          </div> -->
        </q-form>
      </q-card-section>
    </div>
    <!-- <a class="ribbon" :title="`Built with Quasar v${$q.version}`">&nbsp;</a> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';
export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        // chaim42@example.net
        // dejuan53@example.or
        email: 'chaim42@example.net',
        password: 'password',
      },
      message: null,
    }
  },
  validations: {
    form: {
      email: { required, email },
      password: { required, minLength: minLength(4) }
    }
  },
  methods: {
    ...mapActions('authModule', ['signIn']),
    iniciarSesion() {

      this.signIn(this.form).then( () => {
        this.$router.push({ name: 'Entregas'});
      }).catch( error => {
        // console.log(error.response)
      })

    },

  },

}
</script>
<style lang="stylus">
.index-page
  .banner
    height 50vh
    width 100%
    font-size 30vmax
    color rgba(255, 255, 255, .2)
    overflow hidden
  .card
    width 90vw
    max-width 350px
    padding 10px 10px
    margin-top -257px
    border-radius 10px
    img
      height 140px
      width 140px
</style>
