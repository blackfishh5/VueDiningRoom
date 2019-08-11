export default {
  path: '/food',
  component: () => import('@/View/Food'),
  children: [{
      path: '',
      component: () => import('@/components/Window')
    }, {
      path: 'purchase',
      component: () => import('@/components/Purchase')
    },
    {
      path: 'detail/:name',
      component: () => import('@/components/Detail')
    }, {
      path: '/food',
      redirect: '/food'
    }
  ]
}