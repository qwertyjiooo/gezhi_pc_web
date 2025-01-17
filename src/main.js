import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style/index.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import router from './router'
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')
