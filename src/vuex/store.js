import Vue from 'vue'
import Vuex from 'vuex'
import vxTodo from './modules/vxTodo'
Vue.use(Vuex)
const store = new Vuex.Store(
  {
    modules: {
      vxTodo: vxTodo
    }
  }
)
export default store
