import { useLayoutEffect } from "react";
import { useStore } from "@nanostores/react";
import { todoListStore, actions } from "../nanoTodoListStore";
import { inject } from "./context";

todoListStore.subscribe((todoList) => {
  inject("storage").set("todo-list", todoList);
});

export function useNanoTodoList() {
  const todoList = useStore(todoListStore);
  useLayoutEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      todoListStore.set(saved);
    }
  }, []);

  return {
    todoList,
    ...actions,
  };
}
