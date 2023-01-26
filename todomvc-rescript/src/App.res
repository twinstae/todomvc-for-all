@react.component
let make = () => {
	<div className="card shadow-lg rounded-2xl p-4 max-w-lg">
		<TodoForm />
		<TodoList />
	</div>
}