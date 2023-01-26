open NanoTodoList

Runner.runReactImpl(
  ~name="nanostore",
  ~useTodoListImpl=useNanoTodoList,
  ~useTodoActionsImpl=useNanoActions,
  ~setup=nanostoreInit,
)
