import create from "zustand";
import { persist } from "zustand/middleware";
import * as shared from "@core/sharedContainer";
import type { TodoT } from "@core/global";
import { domain } from "@core/domain";
import { createActionsWithSetState } from "@core/createActionsWithSetState";

type TodoListState = {
  todoList: TodoT[];
  addTodo(content: string): void;
  completeTodo(id: TodoT["id"], isCompleted: boolean): void;
  changeTodo(id: TodoT["id"], newContent: string): void;
  deleteTodo(id: TodoT["id"]): void;
};

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
