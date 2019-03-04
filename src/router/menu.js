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
      myrouters.push({
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
  new Menu('首页', '/', 'nested', resolve => require(['@/views/layout/Layout'], resolve), '/dashboard', false).addChildren(
    new Menu('菜单1', 'dashboard', 'nested', () => import('@/views/dashboard/index'), undefined, false)
  ),
  new Menu('首页', '/example', 'example', () => Layout, '/example/table', false).addChildren(
    new Menu('菜单1', 'table', 'table', () => import('@/views/table/index'), undefined, false)
  ),
  new Menu('*', '*', undefined, undefined, '/404', true)
]

export default sitemaps
export {
  sitemaps,
  mappings,
  myrouters
}
