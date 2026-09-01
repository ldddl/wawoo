import './assets/all.scss'
import 'bootstrap'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/authStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)
app.component('LoadingOverlay', Loading)

useAuthStore(pinia).applyStoredToken()

app.mount('#app')
