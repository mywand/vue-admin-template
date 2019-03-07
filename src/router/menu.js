/* eslint-disable */
import nav from './nav'
import Layout from '@/views/layout/Layout'

const mappings = {}
const myrouters = []
class Menu extends nav {
  constructor(title, path, icon, component, redirect, hidden) {
    super(title, path)
    this.icon = icon

    mappings[this.navId] = this
    
    if (component) {
      this.routable = true
      if (hidden != true) {
        hidden = false;
      }
      // this.component=component;
      Object.assign(this,{
        path: path,
        component: component,
        redirect: redirect,
        meta: {
          title: title,
          navId: this.navId,
          icon: icon
        },
        hidden: hidden
      })
      // myrouters.push({

      //   path: path,
      //   component: component,
      //   redirect: redirect,
      //   meta: {
      //     title: title,
      //     navId: this.navId,
      //     icon: icon
      //   },
      //   hidden: hidden
      // });

    }
  }

  hidden() {
    this.hidden = true
    return this
  }

  disabled() {
    this.disabled = true
    return this
  }
}

const sitemaps = [
  new Menu('404', '/404', undefined, () => import('@/views/404'), true),
  new Menu('首页', '/', 'nested', Layout, '/dashboard', false).addChildren(
    new Menu('菜单1', 'dashboard', 'nested', () => import('@/views/dashboard/index'), undefined, false),
    new Menu('菜单2', 'table', 'nested', () => import('@/views/table/index'), undefined, false)
  ),
  // new Menu('首页2222', '/example', 'example', Layout, '/example/table1', false).addChildren(
  //   new Menu('菜单122', 'table1', 'nested', () => import('@/views/table/index'), undefined, false),
  //   new Menu('菜单222222', 'table2', 'nested', () => import('@/views/table/index'), undefined, false)
  // ),
  new Menu('首页', '/example', 'example', Layout, '/example/table1', false).addChildren(
    new Menu('table1', 'table1', 'table', () => import('@/views/table/index'), undefined, false),
    new Menu('table2', 'table2', 'table', () => import('@/views/table/index'), undefined, false)
  ),
  new Menu('*', '*', undefined, undefined, '/404', true)
]
console.log('allroutes',sitemaps)
export default sitemaps
export {
  sitemaps,
  mappings,
  myrouters
}
