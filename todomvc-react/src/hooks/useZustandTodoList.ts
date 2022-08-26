import create from "zustand";
import { persist } from "zustand/middleware";
import * as shared from "@todomvc-core/sharedContainer";
import type { TodoT } from "@todomvc-core/global";
import { domain, TodoActions } from "@todomvc-core/domain";
import { createActionsWithSetState } from "@todomvc-core/createActionsWithSetState";

type TodoListState = {
  todoList: TodoT[];
} & TodoActions;

export const useZustandStore = create<TodoListState, [["zustand/persist", TodoListState]]>(persist((set) => {
  function setTodoList(update: (old: TodoT[]) => TodoT[]) {
    set(({ todoList }) => ({ todoList: update(todoList) }));
  }

  return {
    todoList: [],
    ...createActionsWithSetState(setTodoList, domain),
  };
}, {
  name: 'todo-list', // name of item in the storage (must be unique)
  getStorage: () => {
    const storage = shared.inject("storage");

    return {
      setItem: storage.set,
      getItem: (key) => JSON.stringify(storage.get(key)),
      removeItem: storage.delete
    }
  },
}));

export function useZustandTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useZustandStore((state) => state.todoList);

  return { todoList };
}

export const useZustandActions = () => {
  return {
    addTodo: useZustandStore((state) => state.addTodo),
    completeTodo: useZustandStore((state) => state.completeTodo),
    changeTodo: useZustandStore((state) => state.changeTodo),
    deleteTodo: useZustandStore((state) => state.deleteTodo),
  };
};
