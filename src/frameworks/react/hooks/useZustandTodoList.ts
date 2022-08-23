import { useLayoutEffect } from "react";
import { inject } from ".././context";
import { TodoT } from "../../../global";
import create from "zustand";
import { domain } from "../../domain";

type TodoListState = {
  todoList: TodoT[]
  loadSaved(saved: TodoT[]): void;
  addTodo(content: string): void;
  completeTodo(id: TodoT['id'], isCompleted: boolean): void;
  changeTodo(id: TodoT['id'], newContent: string): void;
  deleteTodo(id: TodoT['id']): void;
}

const useStore = create<TodoListState>((set) => ({
  todoList: [],
  loadSaved: (saved: TodoT[]) => set({ todoList: saved }),
  addTodo: (content) =>
    set(({ todoList }) => ({ todoList: domain.addTodo(todoList, content) })),
  changeTodo: (targetId, content) =>
    set(({ todoList }) => ({
      todoList: domain.changeTodo(todoList, targetId, content),
    })),
  completeTodo: (targetId, isCompleted) =>
    set(({ todoList }) => ({
      todoList: domain.completeTodo(todoList, targetId, isCompleted),
    })),
  deleteTodo: (targetId) =>
    set(({ todoList }) => ({
      todoList: domain.deleteTodo(todoList, targetId),
    })),
}));

export function useZustandTodoList(): { todoList: readonly TodoT[] } {
  const todoList = useStore(state => state.todoList);
  const loadSaved = useStore(state => state.loadSaved);
  useLayoutEffect(() => {
    const saved = inject("storage").get("todo-list");
    if (saved) {
      loadSaved(saved);
    }
  }, []);

  return { todoList };
}

export const useZustandActions = () => {
  return {
    addTodo: useStore(state => state.addTodo),
    completeTodo: useStore(state => state.completeTodo),
    changeTodo: useStore(state => state.changeTodo),
    deleteTodo: useStore(state => state.deleteTodo),
  };
};