// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
// import store from './store'
import VueAcl from 'vue-acl'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.use(Quasar) // Install Quasar Framework

Vue.use(Vuex)

const store = new Vuex.Store({
  state: { acl_current: '' }
})

Vue.use(VueAcl, { router: router, d_permission: 'any', store: store })

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store: store,
    render: h => h(require('./App'))
  })
})
