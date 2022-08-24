import { useStore } from "@nanostores/react";
import { todoListStore, actions } from "../../nanoTodoListStore";
import { TodoT } from "../../../global";

export function useNanoTodoList(): { todoList: readonly TodoT[]} {
  const todoList = useStore(todoListStore);

  return { todoList };
}

export const nanoActions = actions;
