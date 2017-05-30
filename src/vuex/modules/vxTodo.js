import { TODO } from './vxTypes'
import {
  add,
  complete,
  countTotal,
  reopen,
  subscribe,
  unsubscribe,
  update
} from 'src/gun/todo'
const state     = {
  counter: 0,
  list   : []

}
const getters   = {
  activeTodos   : (state) => {
    return state.list.filter(todo => todo.completed === false)
  },
  completedTodos: (state) => {
    return state.list.filter(todo => todo.completed === true)
  }
}
const mutations = {
  [TODO.COUNT_TOTAL] (state, count) {
    state.counter = count
  },
  [TODO.ON_UPDATE] (state, todo) { // gun changes are processed here
    if (todo.key) {
      const index = state.list.findIndex(
        (item) => { return item.key === todo.key })
      if (index === -1) { // ADD, cause todo is not in list yet
        state.list.unshift(todo)
      }
      else {              // UPDATE
        state.list.splice(index, 1, todo)
      }
    }
  }
}

const actions = {

  // for 'addTodo', 'updateTodo' etc.. we only have to talk
  // to gundb. The 'subscribe' method activates
  // the node listeners (when opening the Index page)
  // and makes sure that every change in gundb is processed
  // clientside, via the 'onUpdate' method below.
  addTodo     : ({commit}, todo) => {
    console.log('addTodo', todo)
    add(todo)              // imported method from src/gun/todo.js
    countTotal((count) => { // example of doing 'server' side aggregation
      commit(TODO.COUNT_TOTAL, count)
    })
  },
  completeTodo: ({commit}, todo) => {
    console.log('complete')
    complete(todo)         // imported method from src/gun/todo.js
  },
  countTotal  : ({commit}) => {
    countTotal((count) => {
      commit(TODO.COUNT_TOTAL, count)
    })
  },
  onUpdate ({commit}, todo) {
    commit(TODO.ON_UPDATE, todo)
  },
  reopenTodo  : ({commit}, todo) => {
    console.log('reopen', todo)
    reopen(todo)           // imported method from src/gun/todo.js
  },
  // this method is attached to the created() method in Index.vue comp. (enter page)
  subscribe   : ({commit}) => {
    subscribe((todo) => {  // imported method from src/gun/todo.js
      commit(TODO.ON_UPDATE, todo)
    })
  },
  // this method is attached to the beforeDestroy() method in Index.vue comp. (leave page)
  unsubscribe : ({commit}) => {
    unsubscribe()           // imported method from src/gun/todo.js
  },
  updateTodo  : ({commit}, todo) => {
    update(todo)           // imported method from src/gun/todo.js
  }
}
const vxTodo  = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
export default vxTodo
