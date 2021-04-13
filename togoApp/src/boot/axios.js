import axios from 'axios'

export default ({ Vue }) => {

  


  let  baseURL = 'http://127.0.0.1:8000/api/'
  // }
  // if (process.env.__ENV__ === 'production'){
  //   baseURL = 'http://copabamin.com/api/'
  // }

  Vue.prototype.$axios = axios.create({
    baseURL
  })
}
