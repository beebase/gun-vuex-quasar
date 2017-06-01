import { gun } from './db'
const todos = gun.get('todo')
// .map(); use 'todos' node, to fetch all the connected todo nodes
// .on();  catch the todo object with attached listener
//  and hand over to the callback function.
//  Vuex will receive the callback and perform a TODO.ON_UPDATE,
//  populating its state.list. Now that the listener is active each change
//  in gun will be pushed into vuex!
export const subscribe   = (cb) => {
  todos.map()
       .on(
         (item, key) => {
           item.key = key
           cb(item)
         }
       )
}
export const unsubscribe = () => {
  // this syntax is going to change in later versions (~0.8)
  // and probably doesn't work well yet.
  // After calling.off(), it some cases .on() will not work
  // anymore. (No update events coming in)
  todos.get('todo')
       .map()
       .on(
         (data, key, ctx, ev) => {
           ev.off()
         }
       )
}
//export const unsubscribe = () => todos.off()
export const add         = (todo) => {
  // Todos node acts as a placeholder or "table" for all todo nodes
  // Although a todo node is attached to the todos node it's not embedded.
  // You can still reach for the todo node directly, later on with
  // gun.get(pkTodo) !!
  todos.set(todo)                // Create and attach new todo to todos
}
export const complete    = (todo) => {
  // You don't have to update with entire todo object
  // Just pushing in a partial object will merge nicely!
  const partialObj = {completed: true, date: Date.now()}
  todos.get(todo.key).put(partialObj)
}
export const reopen      = (todo) => {
  todos.get(todo.key).put({completed: false, date: null})
}
export const update      = (todo) => {
  // This is a generic update approach for anything
  // inside todo.
  todos.get(todo.key).put(todo)
}
export const countTotal  = (cb) => {
  let count = 0
  todos.valMapEnd(
    () => { count += 1 },   // method executed for each todo
    () => {
      cb(count)
    }     // method executed when "for each" is completed
  )
}
