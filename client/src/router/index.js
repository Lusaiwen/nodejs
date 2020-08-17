import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/protect',
    name: 'Protect',
    component: () => import(/* webpackChunkName: "about" */ '../views/Protect.vue'),
    beforeEnter: (to, from, next) => {
      if(store.state.loginUser.data){
        next();
      }else {
        window.alert("请登录");
        next("/login");
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
