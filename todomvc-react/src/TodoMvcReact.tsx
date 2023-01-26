import React from "react";
import { nanoActions, useNanoTodoList } from "@todomvc-react/hooks/useNanoTodolist";
import App from "@todomvc-react/App";
import Provider from "@todomvc-react/Provider";

export default function TodoMvcReact() {
  return (
    <Provider useTodoList={useNanoTodoList} useActions={() => nanoActions}>
      <App initValue={[]}/>
    </Provider>
  );
}
