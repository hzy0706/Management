import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
createApp(App).use(ElementPlus).use(VueAxios, axios).mount('#app')
