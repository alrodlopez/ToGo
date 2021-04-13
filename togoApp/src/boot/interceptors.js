// import something here
import { Notify } from 'quasar'
import routes from '../router/routes'
// "async" is optional
export default async ({ Vue }) => {

  Vue.prototype.$axios.interceptors.response.use(response => {
    return response;
  }, (error) => {
    const status = error.response.status
    console.log(status)
    let mensaje = ''
    switch (status) {
      case 400:
          mensaje = error.response.data.error
        break;
      case 401:
          routes.push({ path: 'Login' })
          console.log('ruta login')
        break;
      case 422:
          const { errors } = error.response.data
          mensaje = '<ul style="list-style:none; padding: 0px;">'
          for (const key in errors) {
            const error = errors[key]
            for (const msg of error) {
              mensaje += '<li>' + msg + '</li>'
            }
          }
          mensaje += '</ul>'
        break;
      case 403:
          mensaje = error.response.data.mensaje;
        break;
      case 500:
        mensaje = 'Error en el servidor';
        break;
      default:
          mensaje = error.response.data.message;
        break;


    }
    Notify.create({
      type: 'negative',
      html:true,
      position: 'top',
      multiLine: true,
      message: mensaje
    })
    return Promise.reject(error)
  });

}
