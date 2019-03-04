/* eslint-disable */
import Layout from '@/views/layout/Layout'

const myrouters = []

myrouters.push({
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'Dashboard',
  hidden: true,
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index')
  }]
});

myrouters.push(
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'example'
    },
    children: [
    {
      path: 'table',
      name: 'Table',
      component: () => import('@/views/table/index'),
      meta: {
        title: 'Table',
        icon: 'table'
      }
    },
    {
      path: 'tree',
      name: 'Tree',
      component: () => import('@/views/tree/index'),
      meta: {
        title: 'Tree',
        icon: 'tree'
      }
    }]
  }
)

export default sitemaps
export {
  myrouters
}
