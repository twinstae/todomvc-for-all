open Todo

module UseTodoListContext = {
	let testTodo: todo = { id: 1, content: "test", isCompleted: false }
	let init = { todoList: [testTodo] }
	
  let context = React.createContext(() => init)

  module Provider = {
    let make = React.Context.provider(context)
  }
}

module UseTodoActionsContext = {
	let fakeActions: actions = {
		addTodo: (. content) => {
			Js.Console.log(content)
		},
		completeTodo: (. id, isCompleted) => {
			Js.Console.log2(id, isCompleted)
		},
		deleteTodo: (. id) => {
			Js.Console.log(id)
		},
		changeTodo: (. id, newContent) => {
			Js.Console.log2(id, newContent)
		},
	}
  let context = React.createContext(() => fakeActions)

  module Provider = {
    let make = React.Context.provider(context)
  }
}

let useTodoActions = () => React.useContext(UseTodoActionsContext.context)()

@react.component
let make = (~useTodoListImpl: unit => todoListResult, ~useTodoActionsImpl: unit => actions, ~children: React.element) => {
	<UseTodoListContext.Provider value=useTodoListImpl>
		<UseTodoActionsContext.Provider value=useTodoActionsImpl>
			{children}
		</UseTodoActionsContext.Provider>
	</UseTodoListContext.Provider>
}