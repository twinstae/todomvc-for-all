// import { useStore } from "@nanostores/react";
// import { todoListStore, actions } from "@todomvc-core/nanoTodoListStore";
open Todo
type store<'t>

@send external set: (store<Js.Array.t<todo>>, Js.Array.t<todo>) => unit = "set"
@send external get: (store<Js.Array.t<todo>>) => Js.Array.t<todo> = "get"
@module("@todomvc-core/nanoTodoListStore") external todoListStore: store<Js.Array.t<todo>> = "todoListStore"
@module("@todomvc-core/nanoTodoListStore") external actions: actions = "actions"
@module("@nanostores/react") external useStore: (store<'t>) => 't = "useStore"

let useNanoTodoList = () => {
  let todoList = useStore(todoListStore);
  { todoList: todoList }
}

let useNanoActions = () => actions;

let nanostoreInit = async (init: todoList) => {
	todoListStore -> set(init)
}