import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import {VueSignaturePad} from 'vue-signature-pad'


const app = createApp(App)
const pinia = createPinia()
app.component("VueSignaturePad", VueSignaturePad);
app.use(pinia)
app.use(router)
app.use(ElementPlus)
// app.use(VueSignaturePad)
app.mount('#app')
