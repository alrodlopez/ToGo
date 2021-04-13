<template>
    <div>
        <div class="col-md-12">
            <div class="form-group">
                <label>Nombre</label>
                <input
                    type="text"
                    v-model.trim="$v.modelo.nombre.$model"
                    class="form-control"
                    :class="{ 'is-invalid': $v.modelo.nombre.$error, 'is-valid': !$v.modelo.nombre.$invalid }"
                    autocomplete="off"
                />
                <div v-if="!$v.modelo.nombre.$required" class="invalid-feedback">El campo Nombre es obligatorio</div>
            </div>
        </div>
    </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
export default {
    props: {
        modelo: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            nombre: ''
        }
    },
    validations: {
        modelo: {
            nombre: { required },
        }

    },
}
</script>
