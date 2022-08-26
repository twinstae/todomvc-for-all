import React from "react";
import { nanoActions, useNanoTodoList } from "@/hooks/useNanoTodolist";
import App from "@/App";
import Provider from "@/Provider";

export default function TodoMvcReact() {
  return (
    <Provider useTodoList={useNanoTodoList} useActions={() => nanoActions}>
      <App />
    </Provider>
  );
}
