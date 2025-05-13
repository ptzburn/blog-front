import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://awesome-blog-c4b86ea6a2fe.herokuapp.com'
})

instance.interceptors.request.use(config => {
  config.headers.Authorization = window.localStorage.getItem('token')
  return config
})

export default instance
