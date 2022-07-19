import { createApp } from 'vue'
import App from './App.vue'
// import './samples/node-api'
import 'virtual:svg-icons-register'
import 'typeface-roboto/index.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })