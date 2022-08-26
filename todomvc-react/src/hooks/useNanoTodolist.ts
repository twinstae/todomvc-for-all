import { useStore } from "@nanostores/react";
import { todoListStore, actions } from "@todomvc-core/nanoTodoListStore";
import type { TodoT } from "@todomvc-core/global";

export function useNanoTodoList(): { todoList: readonly TodoT[]} {
  const todoList = useStore(todoListStore);
  return { todoList };
}

export const nanoActions = actions;
