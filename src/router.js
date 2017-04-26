import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/',
      component: load('Layout'),
      meta: { permission: 'any', fail: '/error' },
      children: [
       {path: '/all', component: load('All'), meta: { permission: 'any', fail: '/error' }},
       {path: '/application', component: load('Application'), meta: { permission: 'any', fail: '/error' }},
       {path: '/meeting', component: load('MeetingScheduled'), meta: { permission: 'any', fail: '/error' }},
       {path: '/calldrop1', component: load('CallDrop1'), meta: { permission: 'any', fail: '/error' }},
       {path: '/calldrop2', component: load('CallDrop2'), meta: { permission: 'any', fail: '/error' }},
       {path: '/fake', component: load('FakeProfile'), meta: { permission: 'any', fail: '/error' }},
       {path: '/selected', component: load('Selected'), meta: { permission: 'any', fail: '/error' }},
       {path: '/waiting', component: load('Waiting'), meta: { permission: 'any', fail: '/error' }},
       {path: '/terminated', component: load('Terminated'), meta: { permission: 'any', fail: '/error' }},
       {path: '/rejected', component: load('Rejected'), meta: { permission: 'any', fail: '/error' }}
      ]
    },
   { path: '*', component: load('Error404'), meta: { permission: 'any', fail: '/error' } }
  ]
})
