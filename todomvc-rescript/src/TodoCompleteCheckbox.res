open TodoContext

@react.component
let make = (~id, ~isCompleted) => {
	let todoActions = useTodoActions()

	let onChange = (event) => {
		let isCompleted = ReactEvent.Form.target(event)["checked"]
		todoActions.completeTodo(. id, isCompleted)
	}

	let onKeyUp=(event) => {
		if (ReactEvent.Keyboard.key(event) === "Space") {
			let isCompleted = ReactEvent.Keyboard.target(event)["checked"]
			todoActions.completeTodo(. id, !isCompleted);
		}
	}

	<input type_="checkbox" ariaLabel="완료" checked={isCompleted} onChange onKeyUp/>
}