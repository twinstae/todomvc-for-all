open Todo
open TodoContext

@send external focus: Dom.element => unit = "focus"

@react.component
let make = (~todo: todo) => {
  let todoActions = useTodoActions()
  let (isEditing, setIsEditing) = React.useState(_ => false)
  let editRef = React.useRef(Js.Nullable.null)
  let (text, setText) = React.useState(_ => todo.content)

  let onChange = evt => {
    ReactEvent.Form.preventDefault(evt)
    let value = ReactEvent.Form.target(evt)["value"]
    setText(_prev => value)
  }

  React.useEffect1(() => {
    switch editRef.current->Js.Nullable.toOption {
    | Some(dom) => dom->focus
    | None => ()
    }
    None
  }, [isEditing])

  let startEdit = _e => {
    setIsEditing(_ => true)
  }

  let endEdit = e => {
		ReactEvent.Form.preventDefault(e)
    setIsEditing(_ => false)
    todoActions.changeTodo(. todo.id, text)
  }
  switch isEditing {
  | true =>
    <form
        className="flex align-middle m-0"
        onSubmit={endEdit}
      >
      <input
        type_="text"
				className="input input-sm input-borderded mr-4"
        value={text}
        onChange
        placeholder={todo.content}
        ref={ReactDOM.Ref.domRef(editRef)}
      />
      <button
        type_="submit"
        className="btn btn-primary btn-sm"
        ariaLabel={`할일을 ${todo.content}에서 ${text}로 수정하시려면 클릭하세요.`}>
        {React.string("완료")}
      </button>
    </form>

  | false =>
    <>
      <span className="w-full">{React.string(todo.content)}</span>
      <button
        type_="button"
        onClick={startEdit}
        className="btn btn-primary btn-sm"
        ariaLabel={`할일 ${todo.content}을 수정하시려면 클릭하세요.`}>
        {React.string("수정")}
      </button>
    </>
  }
}
