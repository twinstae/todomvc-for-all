open ReduxTodoList

Runner.runReactImpl(
  ~name="nanostore",
  ~useTodoListImpl=useReduxTodoList,
  ~useTodoActionsImpl=useReduxActions,
	~make=ReduxWrapper.make,
  ~setup=reduxInit,
)
