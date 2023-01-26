open TodoContext

@react.component
let make = () => {
  let {addTodo} = useTodoActions()
  let (text, setText) = React.useState(_ => "")

  let onChange = evt => {
    setText(_prev => ReactEvent.Form.target(evt)["value"])
  }

  let onSubmit = event => {
    ReactEvent.Form.preventDefault(event)
    addTodo(. text)
  }

  <form onSubmit>
    <label className="inline-block grow">
      {React.string("새로운 할일")}
      <input
				type_="text" value={text} onChange
				className="input input-bordered w-full"
			/>
    </label>
    <button
      type_="submit"
      className="btn btn-primary btn-sm"
      ariaLabel={`새로운 할 일 ${text}을 추가하시려면 클릭해주세요`}>
      {React.string("추가")}
    </button>
  </form>
}
