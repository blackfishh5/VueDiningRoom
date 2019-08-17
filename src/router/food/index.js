export default {
  path: '/food',
  component: () => import('@/View/Food'),
  children: [{
      path: '',
      component: () => import('@/components/Window'),
      children: [{
        path: ':id',
        name: 'ooo',
        component: () => import('@/components/Window/windowfood'),
      },{
        path: '/food',
        redirect:'/food/1'
      }]
    }, {
      path: 'purchase',
      component: () => import('@/components/Purchase')
    },
    {
      path: 'detail/:name',
      component: () => import('@/components/Detail')
    }, {
      path: '/food',
      redirect: '/food/window'
    }
  ]
}
