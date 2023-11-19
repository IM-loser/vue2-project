import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import './plugins/element.js'
import 'normalize.css/normalize.css'
import '@/assets/css/base.css'
import api from './api'
Vue.prototype.$api = api;
// import * as echarts  from 'echarts'
// Vue.prototype.$echarts = echarts
//注册全局组件
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel',JsonExcel)
//面包屑
import Breadcrumb from './components/Breadcrumb/Breadcrumb.vue'
Vue.component('Breadcrumb',Breadcrumb)
import i18n from './lang'
//process.env
console.log('环境变量---process.env',process.env);
console.log('process.env.NODE_ENV',process.env.NODE_ENV);
Vue.config.productionTip = false

import Fragment from 'vue-fragment'
Vue.use(Fragment.Plugin)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
