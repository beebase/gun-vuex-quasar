import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter(
  {
    routes: [
      {path: '/', component: load('Index')}, // Default
      {path: '*', component: load('Error404')} // Not found
    ]
  })
