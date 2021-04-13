<template>
    <div>
        <div class="row">
            <loading :active.sync="isLoading"
                    :can-cancel="false" 
                    :on-cancel="onCancelL"
                    :is-full-page="false"></loading>
            <legend class="m-b-10">Datos Personales</legend>
            <div class="col-md-6">
                <div class="form-group">
                    <label><span style="color: red">*</span> Nombres</label>
                    <input
                        v-model.trim="$v.form.nombre.$model"
                        :class="{ 'is-invalid': $v.form.nombre.$error, 'is-valid': !$v.form.nombre.$invalid }"
                        type="text"
                        class="form-control"
                        placeholder="Nombres"
                    >
                    <div v-if="!$v.form.nombre.$required" class="invalid-feedback">El campo es obligatorio</div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label><span style="color: red">*</span> Apellidos</label>
                    <input
                        v-model.trim="$v.form.apellidos.$model"
                        :class="{ 'is-invalid': $v.form.apellidos.$error, 'is-valid': !$v.form.apellidos.$invalid }"
                        type="text"
                        class="form-control"
                        placeholder="Apellidos"
                    >
                    <div v-if="!$v.form.apellidos.$required" class="invalid-feedback">El campo es obligatorio</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class="form-group">
                    <label><span style="color: red">*</span> Email</label>
                    <input
                        v-model.trim="$v.form.email.$model"
                        :class="{ 'is-invalid': $v.form.email.$error, 'is-valid': !$v.form.email.$invalid }"
                        type="email"
                        class="form-control"
                        placeholder="Correo electronico"
                    >
                    <div v-if="!$v.form.email.required" class="invalid-feedback">El campo es obligatorio</div>
                    <div v-if="!$v.form.email.email" class="invalid-feedback">Debe ingresar un email valido</div>
                </div>
            </div>
        </div>
        <div class="row">
            <legend class="m-b-15">Datos Adicionales</legend>
            <div class="col-md-12">
                <div class="form-group">
                    <label><span style="color: red">*</span> Telefono</label>
                    <input
                        v-model.trim="$v.form.telefono.$model"
                        :class="{ 'is-invalid': $v.form.telefono.$error, 'is-valid': !$v.form.telefono.$invalid }"
                        type="text"
                        class="form-control"
                        placeholder="Telefono movil"
                    >
                    <div v-if="!$v.form.telefono.required" class="invalid-feedback">El campo es obligatorio</div>
                    <div v-if="!$v.form.telefono.maxLength" class="invalid-feedback">El numero de telefeno no debe tener mas de 8 digitos</div>
                    <div v-if="!$v.form.telefono.numeric" class="invalid-feedback">El campo solo debe contener numeros</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label>Nit</label>
                    <input
                        v-model.trim="form.nit"
                        type="text"
                        class="form-control"
                        placeholder="NIT"
                    >
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label>Ruat</label>
                    <input
                        v-model.trim="form.ruat"
                        type="text"
                        class="form-control"
                        placeholder="RUAT"
                    >
                </div>
            </div>
        </div>
        <br>
        <div class="botones">
            <button class="btn btn-default" @click.prevent="onCancel()"><i class="fa fa-ban"></i> Cancelar</button>
            <button class="btn btn-primary" @click.prevent="editar()" :disabled="$v.form.$invalid"><i class="fa fa-check"></i> actualizar Registro</button>
        </div>
    </div>
</template>
<script>
import { required, email, sameAs, numeric, maxLength, minLength } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
    name: 'EditarRepartidor',
    props: {
        repartidor: Object,
        required: true
    },
    data() {
        return {
            isLoading: false,
            fullPage: true,
            form: {
                nombre: '',
                apellidos: '',
                email: '',
                telefono: '',
                ruat: '',
                nit: ''
            }
        }
    },
    components: {
		Loading
	},
    validations: {
        form: {
            nombre: { required },
            apellidos: { required },
            email: { required, email },
            telefono: { required, numeric, maxLength: maxLength(8) },
        }

    },
    methods: {
        ...mapActions('repartidores', ['editRepartidor']),
        editar(){
            this.doAjax();
            this.editRepartidor(this.form).then( response => {
                this.$swal.fire('Exito!', 'Registro actualizado exitosamente.', 'success');
                this.form = '';
                this.$v.form.$reset();
                this.$emit('close_modal', null)
                //console.log(response)
            }).catch( error => {
                console.log(error)
            })
        },
        onCancel(){
            this.$emit('close_modal', null)
        },
        doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                  this.isLoading = false
                },2500)
        },
        onCancelL() {
            console.log('User cancelled the loader.')
        }
    },
    created() {
        this.form.nombre = this.repartidor.nombre;
        this.form.apellidos = this.repartidor.apellidos;
        this.form.email = this.repartidor.email;
        this.form.telefono = this.repartidor.telefono;
        this.form.ruat = this.repartidor.ruat;
        this.form.nit = this.repartidor.nit;
        this.form.user_id = this.repartidor.user_id;
    },
}
</script>
<style scoped>
.botones {
    width: 100%;
    border-top: 1px solid #e8e8e8;
    padding-top: 17px;
    text-align: right;
}
</style>
