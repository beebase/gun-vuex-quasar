import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import store from './vuex/store'
require(`quasar/dist/quasar.${__THEME}.css`)
Vue.use(Quasar) // Install Quasar Framework

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
            el    : '#q-app',
            router,
            store,
            render: h => h(require('./App'))
          })
})
