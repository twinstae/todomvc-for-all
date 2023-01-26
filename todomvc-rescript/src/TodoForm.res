open TodoContext

@react.component
let make = () => {
	let todoActions = useTodoActions()
  let (text, setText) = React.useState(_ => "");

  let onChange = evt => {
    ReactEvent.Form.preventDefault(evt)
    let value = ReactEvent.Form.target(evt)["value"]
    setText(_prev => value);
  }

  let onSubmit = event => {
    ReactEvent.Form.preventDefault(event)
    todoActions.addTodo(. text);
  }

	<form onSubmit>
		<label>
			{React.string("새로운 할일")}
			<input onChange type_="text" />
		</label>
	</form>
}