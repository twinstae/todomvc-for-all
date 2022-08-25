import { useStore } from "@nanostores/react";
import { todoListStore, actions } from "../../../src/nanoTodoListStore";
import type { TodoT } from "../../../src/global";

export function useNanoTodoList(): { todoList: readonly TodoT[]} {
  const todoList = useStore(todoListStore);
  return { todoList };
}

export const nanoActions = actions;
