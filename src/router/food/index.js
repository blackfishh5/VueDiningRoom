export default {
  path: '/food/:restaurantId',
  name: 'food',
  component: () => import('@/View/Food'),
  children: [{
      path: 'window',
      component: () => import('@/components/Window'),
      children: [{
        path: ':windowsId',
        name: 'ooo',
        component: () => import('@/components/Window/windowfood'),
      },{
        path:'/food/:restaurantId',
        redirect:'/food/:restaurantId/window/1'
      }]
    }, {
      path: 'purchase',
      name: 'purchase',
      component: () => import('@/components/Purchase')
    },
    {
      path: '/food',
      redirect: '/food/1/window/1'
    }
  ]
}
