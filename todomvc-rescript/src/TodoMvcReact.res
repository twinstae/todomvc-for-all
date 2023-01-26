open TodoContext
open NanoTodoList

@react.comopnent
let make = () => {
	<UseTodoListContext.Provider value=useNanoTodoList>
		<UseTodoActionsContext.Provider value=useNanoActions>
			<App />
		</UseTodoActionsContext.Provider>
	</UseTodoListContext.Provider>
}
