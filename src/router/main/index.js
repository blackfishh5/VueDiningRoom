export default {
  path: '/main',
  component: () => import('@/View/Main'),
  children: [
    {
      path: 'window',
      component: () => import('@/components/Window')
    },
    {
      path: '/main',
      redirect: '/main/window'
    }
  ]
}
