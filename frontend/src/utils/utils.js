import Vue from 'vue'

export function showErrors(errors){
    var mensaje = '<ul style="list-style:none; padding: 0px;">'
    for (const key in errors) {
        const error = errors[key]
        for (const msg of error) {
            mensaje += '<li>' + msg + '</li>'
        }
    }
    mensaje += '</ul>'

   return mensaje

}

export function alerta(title, text, type) {
    return Vue.swal({
        title: title,
        text: text,
        type: type,
        icon: type,
        showCancelButton: false,
        confirmButtonColor: "#008f39",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false
    });
}

export function notificacion(title, icon){
    return Toast.fire({
        title: title,
        icon: icon
    })
}

//Toast.fire({icon: 'success', title: 'Categoria Registrada'});
const Swal = require('sweetalert2');
const Toast =  Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
})