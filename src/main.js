import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router/index.js'
import store from './store/index.js'
import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'
import './assets/scss/all.scss'
import request from './network/request'

const app = createApp(App)
app.config.globalProperties.$request=request
// import md5 from 'js-md5'

// const md5 = require('js-md5');
app.use(ElementPlus)
app.use(router)
app.use(store)
app.mount('#app')
