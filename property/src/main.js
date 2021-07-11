import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import router from './router/index.js'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App).use(router).use(ElementPlus).use(store).use(VueAxios, axios).mount('#app')
