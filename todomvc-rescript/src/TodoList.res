open TodoContext

@react.component
let make = () => {
  let {todoList} = React.useContext(UseTodoListContext.context)()

  <ul>
    {todoList
    -> Belt.Array.map(todo => <TodoListItem key={Belt.Int.toString(todo.id)} todo />)
    -> React.array}
  </ul>
}
