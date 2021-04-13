
export default async ({ store, Vue }) => {


  store.subscribe((mutation) => {
    switch(mutation.type) {
      case 'authModule/SET_TOKEN':
        if(mutation.payload) {
          Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer  ${mutation.payload}`
          localStorage.setItem('access_token', mutation.payload)

        }else {
          Vue.prototype.$axios.defaults.headers.common['Authorization'] = null
          localStorage.removeItem('access_token')
        }
      break;

    }
  })
  store.dispatch('authModule/attempt', localStorage.getItem('access_token'))
}
