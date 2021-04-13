<template >
    <div>
        <div id="header" class="header navbar-default">
            <div class="navbar-header">
                <a href="index.html" class="navbar-brand"><span class="navbar-logo"></span> <b>ToGo </b> Admin</a>
                <button type="button" class="navbar-toggle" data-click="sidebar-toggled">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <ul class="navbar-nav navbar-right">
                <li class="dropdown navbar-user">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        <img src="static/assets/img/user/user-15.jpg" alt="" />
                        <span class="d-none d-md-inline">{{ user.nombre }} {{ user.apellidos }}</span> <b class="caret"></b>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a href="#" class="dropdown-item" @click="cerrarSesion()"><i class="fas fa-sign-out-alt"></i> Cerrar Sesion</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Header',
  data() {
      return {

      }
  },
  computed: {
      ...mapGetters('auth', ['user'])
  },
  methods:{
      ...mapActions('auth', ['logout']),
    cerrarSesion(){
      this.logout().then( response => {
        //console.log(response)
        this.$router.replace({ path: '/'});
      }).catch( error => {
        //console.log(error)
      })
    },
  }
}
</script>
