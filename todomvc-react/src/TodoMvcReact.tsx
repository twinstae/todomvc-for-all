import React from "react";
// import { nanoActions, useNanoTodoList } from "@todomvc-react/hooks/useNanoTodolist";
import { useReduxActions, useReduxTodoList } from "./hooks/useReduxTodoList";
import App from "@todomvc-react/App";
import Provider from "@todomvc-react/Provider";

export default function TodoMvcReact() {
  return (
    <Provider useTodoList={useReduxTodoList} useActions={useReduxActions}>
      <App />
    </Provider>
  );
}
