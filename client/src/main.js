import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false

store.dispatch("loginUser/whoami");//网站启动前，用token换取

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
