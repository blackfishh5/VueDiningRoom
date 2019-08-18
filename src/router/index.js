import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/View/Main'

import mainRouter from './main'
import orderRouter from './order'
import userRouter from './user'
import foodRouter from './food'
import foodDetail from './food/detail.js'
Vue.use(Router)

export default new Router({
  routes: [
    mainRouter,
    orderRouter,
    userRouter,
    foodRouter,
    foodDetail,
    {
      path: '/*',
      redirect: '/main'
    }
  ]
})
