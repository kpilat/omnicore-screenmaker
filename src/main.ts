import { createApp } from 'vue'
import App from './App.vue'
// import './samples/node-api'
import 'virtual:svg-icons-register'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
