open Todo

@react.component
let make = (~todo: todo) => {
	<li className="flex flex-row align-middle gap-2 w-full justify-between">
		<TodoCompleteCheckbox id={todo.id} isCompleted={todo.isCompleted} />
		<TodoEditingForm todo=todo />
		<TodoDeleteButton todoId=todo.id />
	</li>
}