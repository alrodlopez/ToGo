<template>
    <div>
        <div class="account-pages py-5 pt-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-lg-6 col-xl-5">
                        <div class="card overflow-hidden">
                            <div class="bg-warning">
                                <div class="text-primary text-center p-4">
                                    <h5 class="text-white font-size-20">Bienvenido de nuevo a ToGo Admin!</h5>
                                    <p class="text-white-50">Inicia sesión para continuar.</p>
                                    <a href="#" class="logo logo-admin">
                                        <img src="static/assets/images/logo-sm.png" height="45" alt="logo">
                                    </a>
                                </div>
                            </div>
                            <div class="card-body p-4">
                                <div class="p-3 pt-5">
                                    <a-alert v-if="error"
                                        message="Error"
                                        :description="error"
                                        type="error"
                                        show-icon
                                    />
                                    <!-- <div v-if="error" class="alert alert-danger mb-0" role="alert">
                                        <strong>Error!</strong> {{ error }}.
                                    </div> -->
                                    <form @submit.prevent="iniciarSesion()" class="form-horizontal mt-4">
                                        <div class="form-group">
                                            <label for="username">Usuario</label>
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
                                        <div class="form-group">
                                            <label for="userpassword">Contraseña</label>
                                            <input
                                                type="password"
                                                class="form-control"
                                                :class="{ 'is-invalid': $v.form.password.$error, 'is-valid': !$v.form.password.$invalid }"
                                                v-model.trim="$v.form.password.$model"
                                                id="password"
                                                placeholder="Ingrese su contraseña"
                                                autocomplete="off"
                                            >
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-sm-6">
                                                <div class="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        class="custom-control-input"
                                                    >
                                                    <label class="custom-control-label" for="customControlInline">Recordarme</label>
                                                </div>
                                            </div>
                                            <div class="col-sm-6 text-right">
                                                <button class="btn btn-primary w-md waves-effect waves-light" type="submit" :disabled="$v.$invalid">Ingresar</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { required, email, minLength } from 'vuelidate/lib/validators'
import * as utils from '../../utils/utils'
export default {
    name: 'LoginPage',
    data() {
        return {
            form: {
                email: 'admin@gmail.com',
                password: 'qwerty#ee',
                permiso: 'AdminApp'
            },
            error: ''
        }
    },
    validations: {
        form: {
            email: { required, email, },
            password: { required, minLength: minLength(8) }
        }
    },
    methods:{
        ...mapActions('auth', ['signIn']),
        iniciarSesion() {
            this.signIn(this.form).then( (response) => {
                //console.log(response)
                this.$router.push({ path: '/dashboard'});
            }).catch( (error) => {
                this.error = error.response.data.error;
                //this.$swal.fire('Ops!', error.response.data.error, 'error');
            })
        }
    },

}
</script>
