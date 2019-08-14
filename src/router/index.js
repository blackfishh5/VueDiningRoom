import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/View/Main'

import mainRouter from './main'
import orderRouter from './order'
import userRouter from './user'
import foodRouter from './food'
Vue.use(Router)

export default new Router({
  routes: [
    mainRouter,
    orderRouter,
    userRouter,
    foodRouter,
    {
      path: '/*',
      redirect: '/main'
    }
  ]
})
