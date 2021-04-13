<template >
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <div class="navbar-brand-box">
                    <a href="index.html" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="static/assets/images/logo.svg" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="static/assets/images/logo-dark.png" alt="" height="17">
                        </span>
                    </a>
                    <a href="index.html" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="static/assets/images/logo-sm.png" alt="" height="22">
                        </span>
                        <span class="logo-lg">
                            <img src="static/assets/images/logo-light.png" alt="" height="18">
                        </span>
                    </a>
                </div>
                <button type="button" class="btn btn-sm mr-2 font-size-24 d-lg-none header-item waves-effect waves-light" data-toggle="collapse" data-target="#topnav-menu-content">
                    <i class="mdi mdi-menu"></i>
                </button>
            </div>
            <div class="d-flex">
                
                <div class="dropdown d-inline-block">
                    <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <img class="rounded-circle header-profile-user" src="static/assets/images/users/user-12.jpg" alt="Header Avatar">
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                        <a class="dropdown-item" href="#"><i class="mdi mdi-account-circle font-size-17 align-middle mr-1"></i> Profile</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item text-danger" href="#" @click="cerrarSesion()"><i class="bx bx-power-off font-size-17 align-middle mr-1 text-danger"></i> Logout</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
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
