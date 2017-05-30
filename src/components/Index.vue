<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Todo list with quasar/gun/vuex  ({{counter}} nodes created)
      </q-toolbar-title>
    </div>
    <div class="layout-view">
      <div class="list">
        <div class="item">
          <i class="item-primary">edit</i>
          <div class="item-content">
            <input class="full-width"
                   type="text"
                   placeholder="Add new todo"
                   v-model="description"
                   @keyup.enter="createTodo()">
          </div>
        </div>
        <hr>
        <h5>Active</h5>
        <div v-for="todo in activeTodos">
          <div class="item">
            <div class="item-primary">
              <button @click="completeTodo(todo)">
                <i>check_box_outline_blank</i>
              </button>
            </div>
            <div class="item-content">
              <input class="full-width"
                     type="text"
                     placeholder="edit todo"
                     v-model="todo.description"
                     @keyup.enter="updateTodo(todo)">
            </div>
          </div>
        </div>
        <hr>
        <h5 v-show="completedTodos.length > 0">Completed</h5>
        <div v-for="todo in completedTodos">
          <div class="item">
            <div class="item-primary">
              <button @click="reopenTodo(todo)">
                <i>check_box</i>
              </button>
            </div>
            <div class="item-content completed">
              {{ todo.description }}  ( completed @:{{dateFormatter(todo.date)}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-layout>
</template>
<script>
  import {
    mapActions,
    mapGetters,
    mapState
  } from 'vuex'
  export default {
    beforeDestroy () {
      this.unsubscribe()
    },
    computed: {
      ...mapGetters('vxTodo', ['activeTodos', 'completedTodos']),
      ...mapState('vxTodo', ['counter'])
    },
    data () {
      return {
        description: ""
      }
    },
    methods : {
      ...mapActions(
        'vxTodo',
        ['addTodo', 'updateTodo', 'countTotal', 'completeTodo', 'reopenTodo', 'subscribe', 'unsubscribe']
      ),
      createTodo () {
        const newTodo = {
          description: this.description,
          completed  : false
        }
        this.addTodo(newTodo)
        this.description = ''
      },
      dateFormatter(mills) {
        if (mills) {
          const d      = new Date(mills)
          const hour   = d.getHours()
          const minute = d.getMinutes()
          const sec    = d.getSeconds()
          return hour + ':' + minute + ':' + sec
        }
        else {
          return ''
        }
      }
    },
    mounted : function () {
      // Subscribe to updates on the todos set
      this.subscribe()
      this.countTotal()
    }
  }
</script>
<style>
  .completed {
    text-decoration : line-through;
  }
</style>
