import runTest from "../../test/runTest";
import { Elm } from '../src/AppWithExternal.elm'
import { dispatch, loadSaved, reduxStore } from '@todomvc-core/reduxTodoListStore'

runTest({
	framework: `elm: redux`,
	render: async (init) => {
		const root = document.createElement('div');
		root.id = "root"
		document.body.appendChild(root);
		
		reduxStore.dispatch(loadSaved({ saved: init }));
		
		const app = Elm.AppWithExternal.init({
			node: root,
			flags: init,
		});

		app.ports.action.subscribe(dispatch)
		const unsubscribe = reduxStore.subscribe(() => {
			app.ports.subscribeStore.send(reduxStore.getState().todoList)
		})

		afterEach(() => {
			document.body.innerHTML = "";
			unsubscribe()
		})
	},
});