open Todo

@react.component
let make = (~todo: todo) => {
	<li>
		<TodoEditingForm todo=todo />
		<TodoCompleteCheckbox id={todo.id} isCompleted={todo.isCompleted} />
		<TodoDeleteButton todoId=todo.id />
	</li>
}