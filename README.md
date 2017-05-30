# Gun Vuex Quasar 

> An example of binding Gun to Vuex

> Quasar is a great GUI framework for building Mobile Apps and Web sites
https://github.com/quasarframework/quasar

## Build Setup

```bash
$ git clone https://github.com/beebase/gun-vuex-quasar.git
$ cd gun-vuex-quasar
```
``` bash
# install dependencies
$ npm install
```
```bash
# start up gun server (will run @ port 8081)
$ node server
```
```bash
# open new terminal
# start up client app with hot reload at localhost:8080
$ quasar dev
```

## Structure

The directory structure is modular so you 
can easily extend to more complicated apps.

##### src/gun/db.js
configuration/instantiation for Gun
##### src/gun/todo.js
Gun methods for todo
##### src/vuex/modules/vxTodo.js
vxTodo.js imports all the methods from src/gun/todo.js and encapsulates these
into its own Vuex actions.
##### src/components/Index.vue
The Vue component that will show the todo list.
It only communicates with Gun using Vuex.

##### server.js 
The gun server configured to write to data.json