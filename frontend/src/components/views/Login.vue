<template>
    <div>
         <div class="login login-with-news-feed">
            <div class="news-feed">
                <div class="news-image" style="background-image: url(static/assets/img/login-bg/portada1.jpg); background-size: 100% 100% "></div>
                <div class="news-caption">
                    <h4 class="caption-title"><b>ToGo</b> Web App</h4>
                    <p>
                        Bienvenido al Administrador de Restaurantes ToGo
                    </p>
                </div>
            </div>
            <div class="right-content">
                <div class="login-header">
                    <div class="brand">
                        <span class="logo"></span> <b>ToGo</b> Admin
                    </div>
                    <div class="icon">
                        <i class="fa fa-sign-in-alt"></i>
                    </div>
                </div>
                <div class="login-content">
                    <loading :active.sync="isLoading"
                    :can-cancel="false" 
                    :on-cancel="onCancel"
                    :is-full-page="false"></loading>
                    <form @submit.prevent="iniciarSesion()" class="margin-bottom-0">
                        <div class="form-group m-b-15">
                            <input
                                type="text"
                                class="form-control"
                                :class="{ 'is-invalid': $v.form.email.$error, 'is-valid': !$v.form.email.$invalid }"
                                v-model.trim="$v.form.email.$model"
                                id="email"
                                placeholder="Ingrese su correo electronico"
                                autocomplete="off"
                            >
                        </div>
                        <div class="form-group m-b-15">
                            <div>
                                <input
                                    :type="show === true ? 'text' : 'password'"
                                    class="form-control"
                                    :class="{ 'is-invalid': $v.form.password.$error, 'is-valid': !$v.form.password.$invalid }"
                                    v-model.trim="$v.form.password.$model"
                                    id="password"
                                    placeholder="Ingrese su contraseña"
                                    autocomplete="off"
                                >
                            </div>
                        </div>
                        <div class="m-b-30">
                            <i class="fas fa-eye show-icon" v-if="!show"  @click="show=!show"></i>
                            <i class="fas fa-eye-slash hide-icon" v-else @click="show=!show"></i>
                            <label v-if="show"  @click="show=!show">
                            Ocultar Contraseña
                            </label>
                            <label v-else  @click="show=!show">
                            Mostrar Contraseña
                            </label>
                        </div>
                        <div class="login-buttons">
                            <button type="submit" class="btn btn-yellow btn-block btn-lg" :disabled="$v.$invalid">Ingresar</button>
                        </div>
                        <div class="m-t-20 m-b-40 p-b-40 text-inverse">
                            No esta registrado?<a href="register_v3.html">Registrarse</a>
                        </div>
                        <hr />
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import utils  from '../../utils/utils'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'LoginView',
    data() {
        return {
            form: {
                email: 'admin@gmail.com',
                password: 'qwerty#ee',
                permiso: 'Restaurante'
            },
            show: false,
            isLoading: false,
            fullPage: true,
        }
    },
    validations: {
        form: {
            email: { required, email, },
            password: { required, minLength: minLength(8) }
        }
    },
    components: {
		Loading
	},
    methods:{

        ...mapActions('auth', ['signIn']),
        iniciarSesion() {
            this.doAjax();
            this.signIn(this.form).then( (response) => {
                this.$router.push({ path: '/dashboard'});
                //console.log(response.response)
            }).catch( (error) => {

                //this.form.email = '';
                //this.form.password = '';
                //this.$v.form.$reset();
                //utils.showErrors(error.response.data.error);
                this.$swal.fire('Ops!', error.response.data.error, 'error');
            })

        },
        doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },2500)
        },
        onCancel() {
            console.log('User cancelled the loader.')
        }
    },
}
</script>
