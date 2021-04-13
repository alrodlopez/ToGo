import Vue from 'vue'
import moment from 'moment'
import {notification} from 'ant-design-vue';


export function getHumanDate(date){
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY');
}


export function openNotificationWithIcon(type, title, message) {
    notification[type]({
      message: title,
      description: message
    });
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
