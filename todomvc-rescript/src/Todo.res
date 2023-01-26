type todo = {
  id: int,
  content: string,
  isCompleted: bool,
};

type todoList = Belt.Array.t<todo>

type todoListResult = { todoList: todoList }

type actions = {
	addTodo: (. string) => unit,
	completeTodo: (. int, bool) => unit,
	deleteTodo: (. int) => unit,
	changeTodo: (. int, string) => unit,
}