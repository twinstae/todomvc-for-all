open Todo
open TodoContext

@send external focus: Dom.element => unit = "focus"

@react.component
let make = (~todo: todo) => {
	let todoActions = useTodoActions()
  let (isEditing, setIsEditing) = React.useState(_ => false)
  let editRef = React.useRef(Js.Nullable.null)
	let (text, setText) = React.useState(_ => todo.content);

  let onChange = evt => {
    ReactEvent.Form.preventDefault(evt)
    let value = ReactEvent.Form.target(evt)["value"]
    setText(_prev => value);
  }

	React.useEffect1(() => {
		switch editRef.current-> Js.Nullable.toOption {
			| Some(dom) => dom->focus
			| None => ()
    }
		None
	}, [isEditing])

	let startEdit = (_e) => {
		setIsEditing((_) => true)
	}

	let endEdit = (_e) => {
		setIsEditing((_) => false)
		todoActions.changeTodo(. todo.id, text)
	}
  switch isEditing {
			| true => (
				<>
					<input type_="text" value={text} onChange placeholder={todo.content} ref={ReactDOM.Ref.domRef(editRef)} />
					<button type_="button" onClick={endEdit} ariaLabel={`할일을 ${todo.content}에서 ${text}로 수정하시려면 클릭하세요.`}> {React.string("완료")} </button>
				</>
			)
			| false => (
				<>
					{React.string(todo.content)}
					<button type_="button" onClick={startEdit} 
            ariaLabel={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}> {React.string("수정")} </button>
				</>
			)
	}
}
