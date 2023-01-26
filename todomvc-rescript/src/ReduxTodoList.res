open Todo

type reduxStore;

type reduxProviderProps<'children, 'store> = {
	store: 'store,
	children: 'children
}

module ReduxProvider = {
  @module("react-redux") @react.component
  external make: (
		~store: reduxStore,
    ~children: React.element,
  ) => React.element = "Provider"
}


@module("@todomvc-core/reduxTodoListStore") external reduxStore: reduxStore = "reduxStore"
@module("@todomvc-react/hooks/useReduxTodoList") external useReduxTodoList: () => todoListResult = "useReduxTodoList"
@module("@todomvc-react/hooks/useReduxTodoList") external useReduxActions: () => actions = "useReduxActions"
@module("@todomvc-react/hooks/useReduxTodoList") external reduxInit: (todoList) => promise<unit> = "reduxInit"

@react.component
module ReduxWrapper = {
	let make = (~children) => {
		<ReduxProvider store={reduxStore}>
			{children}
		</ReduxProvider>
	}
}