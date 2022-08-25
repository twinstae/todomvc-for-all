import React from "react";
import { nanoActions, useNanoTodoList } from "./hooks/useNanoTodolist";
import App from "./App";
import { UseActionsContext } from "./useActions";
import { UseTodoListContext } from "./useTodoList";

export default function TodoMvcReact() {
  return (
    <UseTodoListContext.Provider value={useNanoTodoList}>
      <UseActionsContext.Provider value={() => nanoActions}>
        <App />
      </UseActionsContext.Provider>
  </UseTodoListContext.Provider>
  );
}
