import store from '@/config/store'
import axios from '@/config/axios/axios'

store.subscribe((mutation) => {
    switch(mutation.type) {
    case 'auth/SET_TOKEN':
        // console.log(mutation.payload)
        if(mutation.payload) {
            axios.defaults.headers.common['Authorization'] = `Bearer  ${mutation.payload}`
            localStorage.setItem('access_token', mutation.payload)

        }else {
            axios.defaults.headers.common['Authorization'] = null
            localStorage.removeItem('access_token')
        }
    break;

    }
})

