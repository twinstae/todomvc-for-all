open TodoContext
open Todo

@module("../../test/runTest") external runTest: ({
	"framework": string,
	"render": (~init: todoList) => promise<ReactTestingLibrary.renderResult>
}) => unit = "default"

type todoStorage

@send external set: (todoStorage, string, todoList) => unit = "set"

@module("@todomvc-core/sharedContainer") external inject: (~key: string) => todoStorage = "inject"

type wrapperProps<'children> = {
  children: 'children,
}

let runReactImpl = (~name: string, ~useTodoListImpl: () => todoListResult, ~useTodoActionsImpl: () => actions,
 ~make: (
    ~children: React.element,
  ) => React.element,
 ~setup: (todoList) => promise<unit>) => {
	runTest({
    "framework": `react-rescript: ${name}`,
    "render": async (~init: todoList) => {
      inject(~key="storage") -> set("todo-list", init)

			await setup(init);

			ReactTestingLibrary.render(
				<TodoContext useTodoListImpl=useTodoListImpl useTodoActionsImpl=useTodoActionsImpl>
					{make(~children=<App/>)}					
				</TodoContext>
			)
    },
  })
};

// <Provider useTodoList={useTodoListImpl} useActions={useActionsImpl}>
//   <Wrapper>
//     <App />
//   </Wrapper>
// </Provider>