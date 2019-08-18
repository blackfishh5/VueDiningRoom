export default {
    path: '/detail/:restaurantId/:windowsId/:foodId',
    name: 'foodDetail',
    component: () => import('@/View/Food/detail')
  }
  