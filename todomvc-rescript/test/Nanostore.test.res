open NanoTodoList

Runner.runReactImpl(
  ~name="nanostore",
  ~useTodoListImpl=useNanoTodoList,
  ~useTodoActionsImpl=useNanoActions,
	~make=NanoTodoListWrapper.make,
  ~setup=nanostoreInit,
)
