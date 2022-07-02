import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/global.css'
// 引入全局过滤器
import '@/utils/filter'
import '@/utils/focus'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
