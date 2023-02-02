import type { AnyAction } from '@reduxjs/toolkit';
import runTest from "../../test/runTest";
import { Elm } from '../src/AppWithExternal.elm'
import { todoListStore, actions } from '@todomvc-core/nanoTodoListStore'

runTest({
	framework: `elm: redux`,
	render: async (init) => {
		const root = document.createElement('div');
		root.id = "root"
		document.body.appendChild(root);
		
		todoListStore.set(init);

		const app = Elm.AppWithExternal.init({
			node: root,
			flags: init,
		});

		app.ports.action.subscribe(({type, payload}: AnyAction) => {
			switch (type) {
				case 'todoList/addTodo':
					return actions.addTodo(payload.content);
				case 'todoList/deleteTodo':
					return actions.deleteTodo(payload.id)
				case 'todoList/completeTodo':
					return actions.completeTodo(payload.id, payload.isCompleted)
				case 'todoList/changeTodo':
					return actions.changeTodo(payload.id, payload.content)
			}
		})
		const unsubscribe = todoListStore.subscribe((todoList) => {
			app.ports.subscribeStore.send(todoList)
		})

		afterEach(() => {
			document.body.innerHTML = "";
			unsubscribe()
		})
	},
});