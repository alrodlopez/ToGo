<template>
    <div class="topnav">
        <div class="container-fluid">
            <nav class="navbar navbar-light navbar-expand-lg topnav-menu">
                <div class="collapse navbar-collapse active" id="topnav-menu-content">
                    <ul class="navbar-nav active">
                        <!-- <li class="nav-item">
                            <a class="nav-link" href="index.html">
                                <i class="ti-home mr-2"></i>Dashboard
                            </a>
                        </li> -->
                        <li class="nav-item">
                            <router-link :to="{name: 'restaurantes'}" class="nav-link">
                                <i class="fas fa-hamburger"></i>
                                <span>Restaurantes</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'repartidores'}" class="nav-link">
                                <i class="fas fa-motorcycle"></i>
                                <span>Repartidores</span>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="{name: 'categorias'}" class="nav-link">
                                <i class="fas fa-list"></i>
                                <span>Categorias</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'SideBar',
  methods:{
      ...mapActions('auth', ['logout']),
    cerrarSesion(){
      this.logout().then( response => {
        //console.log(response)
        this.$router.push({ path: '/login'});
      }).catch( error => {
        console.log(error)
      })
    },
  }
}
</script>
