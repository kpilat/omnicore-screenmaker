import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import './samples/node-api'

const pinia = createPinia()
import 'virtual:svg-icons-register'
import 'typeface-roboto/index.css'

const app = createApp(App)
app.use(pinia)
app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
