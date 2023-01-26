open TodoContext

@react.component
let make = (~todoId) => {
	let todoActions = useTodoActions()

	let onClick = (_event) => {
		todoActions.deleteTodo(. todoId)
	}

	<button onClick type_="button" className="btn btn-sm btn-error">{React.string("삭제")}</button>
}