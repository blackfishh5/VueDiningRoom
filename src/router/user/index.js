export default {
  path: '/user',
  component: () => import('@/View/User'),
  children:[{
    path:'detail',
    component: () => import('@/View/User/detail')
  },{
    path:'login',
    component: () => import('@/View/User/login')
  },{
    path:'/user',
    redirect:'/user/detail'
  }]
}
