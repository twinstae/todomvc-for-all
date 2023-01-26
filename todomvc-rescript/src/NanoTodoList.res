open Todo

type store<'t>
@send external set: (store<'a>, 'a) => unit = "set"
@send external get: (store<'a>) => 'a = "get"
@module("@todomvc-core/nanoTodoListStore") external todoListStore: store<todoList> = "todoListStore"
@module("@todomvc-core/nanoTodoListStore") external actions: actions = "actions"
@module("@nanostores/react") external useStore: (store<'a>) => 'a = "useStore"

let useNanoTodoList = () => {
  let todoList = useStore(todoListStore);
  { todoList: todoList }
}

let useNanoActions = () => actions;

let nanostoreInit = async (init) => {
	todoListStore -> set(init)
}