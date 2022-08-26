/* eslint-disable react/no-unknown-property */
/* eslint-disable react/react-in-jsx-scope */
/** @jsxImportSource solid-js */

import { useStore } from "@nanostores/solid";
import { actions, todoListStore } from "@todomvc-core/nanoTodoListStore";
import App from "./App";
import { provide } from "./context";

provide('useTodoList', () => useStore(todoListStore))
provide('useActions', () => actions)

export default function TodoMvcReact() {
  return <App />;
}
