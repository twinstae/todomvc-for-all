import { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { todoListStore, actions } from "../../nanoTodoListStore";
import { inject } from ".././context";
import { TodoT } from "../../../global";

export function useNanoTodoList(): { todoList: readonly TodoT[]} {
  const todoList = useStore(todoListStore);
  useEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      todoListStore.set(saved);
    }

    const unsubscribe = todoListStore.subscribe((todoList) => {
      inject("storage").set("todo-list", todoList);
    });
    return unsubscribe
  }, []);

  return { todoList };
}

export const nanoActions = actions;
