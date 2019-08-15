export default {
  path: '/order',
  component: () => import('@/View/Order'),
  children: [{
    path: '',
    component: () => import('@/components/OrderList')
  }]
}
