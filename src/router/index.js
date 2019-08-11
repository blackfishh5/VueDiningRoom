import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/View/Main'

import mainRouter from './main'
import foodRouter from './food'
import clientRouter from './client'
Vue.use(Router)

export default new Router({
  routes: [
    mainRouter,
    foodRouter,
    clientRouter,
    {
      path: '/*',
      redirect: '/main'
    }
  ]
})
